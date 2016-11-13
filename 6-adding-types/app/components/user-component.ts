import {Component, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserView} from "./user-view";
import {ActivatedRoute, Params} from '@angular/router'

@Component({
    selector: 'user',
    providers: [UserService],
    template: `
        <div *ngIf="!user">Loading user...</div>
        <div *ngIf="user">
            <user-view [user]="user"></user-view>
            <hr/>
            <a [routerLink]="['/users']">Show all users</a>
        </div>
    `
})
export class UserComponent {

    @Input() private user:any;

    constructor(service:UserService, route: ActivatedRoute) {
        route.params.forEach((params: Params) => {
            var userId = params["id"];
            if (userId) {
                service.get(userId).subscribe(user =>  this.user = user);
            }
        });
    }

}
