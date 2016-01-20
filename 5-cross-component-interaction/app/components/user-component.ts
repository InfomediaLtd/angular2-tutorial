import {Component, Input} from 'angular2/core';
import {UserService} from '../services/user-service';
import {UserView} from "./user-view";
import {RouterLink, RouteParams} from 'angular2/router'

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

    @Input() private user:any;

    constructor(service:UserService, params: RouteParams) {
      service.get(params.get("id")).subscribe((user) => {
          this.user = user;
      });
    }

}
