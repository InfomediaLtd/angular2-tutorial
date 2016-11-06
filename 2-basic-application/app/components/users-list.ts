import {Component} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
    selector: 'users',
    template: `
        <div *ngIf="!users">Loading users...</div>
        <ul *ngIf="users">
            <li *ngFor="let user of users">
                <a [routerLink]="['/user', user.id]">{{user.name}}</a>
            </li>
        </ul>
    `
})
export class UsersList {

    private users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe(users =>  this.users = users);
    }

}
