import {Component} from 'angular2/angular2'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {UsersList} from './components/users-list'
import {UserView} from './components/user-view'
import {UsersListWithDetails} from "./components/users-list-with-details";

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1 class="jumbotron">Angular Getting Started</h1>
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
}