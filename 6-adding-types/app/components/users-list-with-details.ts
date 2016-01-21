import {Component} from 'angular2/core';
import {UserService} from '../services/user-service';
import {SimpleList} from 'angular2-simple-list';
import {UserView} from "./user-view";
import {User} from "../data/user";

@Component({
    selector: 'users-with-details',
    providers: [UserService],
    template: `
      <div class="row">
        <simple-list class="col-xs-4"
          [list]="users"
          [content]="getContent"
          [link]="getLink"
          (current)="currentUser=$event">
        </simple-list>
        <user *ngIf="currentUser" [user]="currentUser" class="col-xs-7 col-xs-offset-1"></user>
      <div>
    `,
    directives: [SimpleList, UserView]
})
export class UsersListWithDetails {

    public users:User[];
    public currentUser:User;

    constructor(service:UserService) {
        service.list().subscribe(users => this.users = users);
    }

    getContent(user:User):string { return user.name; }
    getLink(user:User):any[] { return ['User', {id:user.id}]; }

}
