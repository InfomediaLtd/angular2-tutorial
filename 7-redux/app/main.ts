import 'zone.js'
import 'reflect-metadata'

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from './app.module'

import '@angular/material/core/theming/prebuilt/deeppurple-amber.css!';

platformBrowserDynamic().bootstrapModule(AppModule);