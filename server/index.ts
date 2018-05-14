import * as functions from 'firebase-functions';

// ./index.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
// import * as compression from 'compression';

import { join } from 'path';
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(join(__dirname, 'dist-server/main'));

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const document = require('fs').readFileSync(join(__dirname, 'index.html'), 'utf8');

// app.use(compression());

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

export let ssr = functions.https.onRequest(app);
