import {Component} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
    selector: 'users',
    template: `
        <div>
            <div *ngIf="!users">Loading users...</div>
            <md-list *ngIf="users">
                <md-list-item *ngFor="let user of users">
                    <a [routerLink]="['/user', user.id]">{{user.name}}</a>
                </md-list-item>
            </md-list>
        </div>
    `
})
export class UsersList {

    private users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe(users =>  this.users = users);
    }

}
