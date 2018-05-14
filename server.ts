// ./index.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as compression from 'compression';
import * as fs from 'fs';
import * as spdy from 'spdy';

import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from './dist/server/main';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist');

const document = fs.readFileSync(join(DIST_FOLDER, '/server/index.html'), 'utf8');

app.use(compression());

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.get('**', async (req, res) => {
  const html = await renderModuleFactory(AppServerModuleNgFactory, {
    document, url: req.path,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });
  res.set('Cache-Content', 'public, max-age=600, dc-max-age=1200');
  res.send(html);
});

const options = {
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
};

spdy.createServer(options, app).listen(443, (error) => {
    if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log(`Node server listening on http://localhost`);
  }
});

// Redirect from http port 80 to https
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
    res.end();
}).listen(80);
