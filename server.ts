// ./index.js
require('zone.js/dist/zone-node');
require('reflect-metadata');

import { enableProdMode } from '@angular/core';

// const express = require('express');
import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(join(DIST_FOLDER, '/server/main'));

const { renderModuleFactory } = require('@angular/platform-server');

const document = require('fs').readFileSync(join(DIST_FOLDER, '/browser/index.html'), 'utf8');

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('**', async (req, res) => {
  const html = await renderModuleFactory(AppServerModuleNgFactory, { document, url: req.path });
  res.set('Cache-Content', 'public, max-age=600, dc-max-age=1200');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
