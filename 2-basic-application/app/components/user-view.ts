import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {RouterLink, RouteParams} from 'angular2/router'

@Component({
    selector: 'user',
    template: `
        <a [router-link]="['Users']">Show all users</a>
        <hr/>

        <div *ng-if="user">
            <div><label>ID: </label><span>{{user.id}}</span></div>
            <div><label>Name: </label><span>{{user.name}}</span></div>
            <div><label>Username: </label><span>{{user.username}}</span></div>
            <div><label>Email: </label><span>{{user.email}}</span></div>
            <div><label>Address: </label><span>{{user.address.street}}, {{user.address.city}}</span></div>
        </div>

    `,
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class UserView {

    private user;

    constructor(service:UserService, params: RouteParams) {
        var userId = params.get("id");
        service.get(userId).subscribe((user) =>  { this.user = user; });
    }

}