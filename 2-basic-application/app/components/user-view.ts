import {Component} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from '../services/user.service';

@Component({
    selector: 'user',
    template: `
        <a [routerLink]="['/users']">Show all users</a>
        <hr/>

        <div *ngIf="user">
            <div><label>ID: </label><span>{{user.id}}</span></div>
            <div><label>Name: </label><span>{{user.name}}</span></div>
            <div><label>Username: </label><span>{{user.username}}</span></div>
            <div><label>Email: </label><span>{{user.email}}</span></div>
            <div><label>Address: </label><span>{{user.address.street}}, {{user.address.city}}</span></div>
        </div>
    `
})
export class UserView {

    private user;

    constructor(service:UserService, route:ActivatedRoute) {
        route.params.forEach((params: Params) => {
            var userId = params["id"];
            service.get(userId).subscribe(user =>  this.user = user);
        });
    }

}
