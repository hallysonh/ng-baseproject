// ./index.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from './dist/server/main';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const document = require('fs').readFileSync(join(DIST_FOLDER, '/browser/index.html'), 'utf8');

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

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
