import 'zone.js';
import 'reflect-metadata';

import {bootstrap} from 'angular2/angular2';
import {AppComponent} from "./app-component";

import {HTTP_PROVIDERS} from 'angular2/http';
import {UserService} from './services/user-service'

bootstrap(AppComponent, [HTTP_PROVIDERS, UserService]);