import 'zone.js';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {AppComponent} from "./app-component";

import {HTTP_PROVIDERS} from 'angular2/http';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {ROUTER_PROVIDERS, RouterOutlet, RouteConfig} from 'angular2/router';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS
]);
