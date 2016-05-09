import {Component} from '@angular/core'
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated'
import {UsersList} from './components/users-list'
import {UserView} from './components/user-view'

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
  {path: '/', component: UsersList, name: 'Users', useAsDefault:true},
  {path: '/users', component: UsersList, name: 'Users'},
  {path: '/user/:id', component: UserView, name: 'User'}
])
export class AppComponent { }
