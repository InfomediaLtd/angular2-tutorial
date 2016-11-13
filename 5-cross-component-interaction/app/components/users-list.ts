import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
 
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
    public users:any[];

    constructor(service:UserService) {
   		service.list().subscribe(users => this.users = users );
  	}
  	getContent(user):string {
    	return user.name;
  	}
  	getLink(user):any[] {
    	return ['/user', user.id];
  	}
}