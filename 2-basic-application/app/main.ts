import 'zone.js';
import 'reflect-metadata';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from "./app-component";

import {HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS
]);
