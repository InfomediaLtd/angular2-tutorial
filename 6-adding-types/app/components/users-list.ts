import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../data/user";

@Component({
    selector: 'users',
    providers: [UserService],
    template: `
        <simple-list
            [list]="users"
            [content]="getContent"
            [link]="getLink">
        </simple-list>
    `
})
export class UsersList {
    public users:User[];

    private getContent:(user:User)=>string = ({name}) => name;
    private getLink   :(user:User)=>any[]  = ({id}) => ['/user', id];

    constructor(service:UserService) {
   		service.list().subscribe(users => this.users = users );
  	}

}