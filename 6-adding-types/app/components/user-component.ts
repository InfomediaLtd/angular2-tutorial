import {Component, Input} from '@angular/core';
import {UserService} from '../services/user-service';
import {UserView} from "./user-view";
import {RouterLink, RouteParams} from '@angular/router-deprecated'
import {User} from "../data/user";

@Component({
    selector: 'user',
    providers: [UserService],
    template: `
        <div *ngIf="!user">Loading user...</div>
        <div *ngIf="user">
            <user [user]="user"></user>
            <hr/>
            <a [routerLink]="['Users']">Show all users</a>
        </div>
    `,
    directives: [RouterLink, UserView]
})
export class UserComponent {

    @Input() private user:User;

    constructor(service:UserService, params: RouteParams) {
      service.get(params.get("id")).subscribe(user => this.user = user);
    }

}
