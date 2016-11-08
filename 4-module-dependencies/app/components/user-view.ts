import {Component} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from '../services/user.service';

@Component({
    selector: 'user',
    template: `
        <div>
            <md-card *ngIf="user">
                <md-card-title>{{user.name}}</md-card-title>   
                <p><label>ID: </label><span>{{user.id}}</span></p>
                <p><label>Username: </label><span>{{user.username}}</span></p>
                <p><label>Email: </label><span>{{user.email}}</span></p>
                <p><label>Address: </label><span>{{user.address.street}}, {{user.address.city}}</span></p>
            </md-card>
            <br/>
            <a [routerLink]="['/users']">Show all users</a>
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
