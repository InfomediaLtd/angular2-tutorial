import {Component} from 'angular2/core';
import {UserService} from '../services/user-service';
import {RouterLink} from 'angular2/router'

@Component({
    selector: 'users',
    providers: [UserService],
    template: `
        <div *ngIf="!users">Loading users...</div>
        <ul *ngIf="users">
            <li *ngFor="#user of users">
                <a [routerLink]="['User', {id:user.id}]">{{user.name}}</a>
            </li>
        </ul>
    `,
    directives: [RouterLink]
})
export class UsersList {

    private users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe((users) =>  { this.users = users; });
    }

}
