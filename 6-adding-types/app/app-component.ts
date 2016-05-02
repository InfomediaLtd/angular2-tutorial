import {Component} from 'angular2/core'
import {Location} from 'angular2/platform/common';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {UsersList} from './components/users-list'
import {UserComponent} from './components/user-component'
import {UsersListWithDetails} from "./components/users-list-with-details";

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1 class="jumbotron">Angular Getting Started</h1>
            <button type="button"
                [class]="'btn ' + getClass('btn-primary','btn-default','/user')"
                [routerLink]="['./Users']" class="active">Users</button>
            <button type="button"
                [class]="'btn ' + getClass('btn-default','btn-primary','/user')"
                [routerLink]="['./UsersWithDetails']" style="margin-left:20px">Users With Details</button>
            <hr/>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', component: UsersListWithDetails, name: 'UsersWithDetails', useAsDefault:true},
  {path: '/users', component: UsersList, name: 'Users'},
  {path: '/user/:id', component: UserComponent, name: 'User'}
])
export class AppComponent {

    constructor(private _location:Location) {
    }

    getClass(primaryOption, defaultOption, prefixToCheck) {
        return this._location.path().startsWith(prefixToCheck) ? primaryOption : defaultOption;
    }

}
