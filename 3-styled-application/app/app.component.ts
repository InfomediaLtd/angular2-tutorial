import {Component} from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <div>
            <md-toolbar color="primary">Angular Getting Started</md-toolbar>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent { }
