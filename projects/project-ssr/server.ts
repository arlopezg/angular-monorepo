import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { LOCALE_ID } from '@angular/core';

import express from 'express';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';

import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const distLang = basename(serverDistFolder);
  const browserDistFolder = resolve(serverDistFolder, `../../browser/${distLang}`);
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${req.hostname}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: LOCALE_ID, useValue: distLang },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const { env } = process;
  const port = env["FIREBASE_FUNCTIONS_EMULATOR_HOST"] || env["PORT"] || 4000;

  app().listen(port, () => {
    // Start up the Node server
    console.log(`Node Express server should listen on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
