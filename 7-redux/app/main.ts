import "zone.js/dist/zone.min.js";
import "reflect-metadata";

import {bootstrap} from "angular2/platform/browser";
import {provide} from "angular2/core";
import {AppComponent} from "./app-component";

import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";

import "angular2-materialize";

import {AppStore,createAppStoreFactory} from "angular2-redux";
import users from "./reducers/users-reducer";

const appStoreFactory = createAppStoreFactory(users);

bootstrap(AppComponent, [
    provide(AppStore, {useFactory: appStoreFactory}),
    ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS
]);

/* tslint:disable */
// polyfill for Object.assign (not part of TS yet)
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            "use strict";
            if (target === undefined || target === null) {
                throw new TypeError("Cannot convert first argument to object");
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
