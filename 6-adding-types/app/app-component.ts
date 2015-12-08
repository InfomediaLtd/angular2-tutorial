import {Component} from 'angular2/angular2'
import {RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router'
import {UsersList} from './components/users-list'
import {UserView} from './components/user-view'
import {UsersListWithDetails} from "./components/users-list-with-details";

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1 class="jumbotron">Angular Getting Started</h1>
            <button type="button"
                [class]="'btn ' + getClass('btn-primary','btn-default','/user')"
                [router-link]="['./Users']" class="active">Users</button>
            <button type="button"
                [class]="'btn ' + getClass('btn-default','btn-primary','/user')"
                [router-link]="['./UsersWithDetails']" style="margin-left:20px">Users With Details</button>
            <hr/>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: UsersListWithDetails, as: 'UsersWithDetails'},
    {path: '/users', component: UsersList, as: 'Users'},
    {path: '/user/:id', component: UserView, as: 'User'}
])
export class AppComponent {

    constructor(private _location:Location) {
    }

    getClass(primaryOption, defaultOption, prefixToCheck) {
        return this._location.path().startsWith(prefixToCheck) ? primaryOption : defaultOption;
    }

}