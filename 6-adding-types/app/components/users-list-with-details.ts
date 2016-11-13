import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../data/user";

@Component({
    selector: 'users-with-details',
    providers: [UserService],
    template: `
        <md-grid-list cols="2">
            <md-grid-tile>
                <simple-list
                    [list]="users"
                    [content]="getContent"
                    [link]="getLink"
                    (current)="currentUser=$event">
                </simple-list>
            </md-grid-tile>
            <md-grid-tile>
                <user-view *ngIf="currentUser" [user]="currentUser"></user-view>
            </md-grid-tile>
        </md-grid-list>          
    `
})
export class UsersListWithDetails {

    private users:any[];
    private currentUser:any;

    private getContent:(user:User)=>string = ({name}) => name;
    private getLink   :(user:User)=>any[]  = ({id}) => ['/user', id];

    constructor(service:UserService) {
        service.list().subscribe(users => this.users = users);
    }

}