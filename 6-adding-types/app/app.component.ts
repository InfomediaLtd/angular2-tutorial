import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'my-app',
    template: `
        <div>
            <md-toolbar color="primary">
                <span>Angular Getting Started</span>
            </md-toolbar>
            <md-card>
                <md-radio-button name="route" [checked]="isChecked('users')" [routerLink]="['/users']">Users</md-radio-button>
                <md-radio-button name="route" [checked]="isChecked('usersWithDetails')" [routerLink]="['/usersWithDetails']">Users with Details</md-radio-button>
                <md-radio-button name="route" [checked]="isChecked('user')" [disabled]="true">User details</md-radio-button>
            </md-card>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    constructor(private _router: ActivatedRoute) {}
    isChecked(pathToCheck) {
        if (this._router.snapshot.firstChild) {
            return this._router.snapshot.firstChild.url[0].path == pathToCheck;
        }
    }
}
