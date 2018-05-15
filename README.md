# Ng-baseproject

[![travis build](https://travis-ci.org/hallysonh/ng-baseproject.svg?branch=master)](https://travis-ci.org/hallysonh/ng-baseproject)
[![Greenkeeper badge](https://badges.greenkeeper.io/hallysonh/ng-baseproject.svg)](https://greenkeeper.io/)
[![MIT License](https://img.shields.io/github/license/hallysonh/ng-baseproject.svg)](https://opensource.org/licenses/MIT)

Angular 6.0.1 Project configured to SSR (Server Side Rendering), PWA and Perfect Lighthouse Score.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Server Side Rendering

### Simple Express

In the `main` branch, run `yarn build:ssr && yarn serve:ssr` for a production server. Navigate to `http://localhost:4000`.

### Http2 Server

Switch to `http2` branch and run `yarn build:ssr && yarn serve:ssr` for a HTTP2 production server. Navigate to `https://localhost`.

> Remember to change the key and cert in your prodution environment.

### Firebase SSR hosting

Switch to `firebase` branch, run `firebase init` to config your firebase account, and finally run `yarn build:all && yarn deploy` to build and deploy the app.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
