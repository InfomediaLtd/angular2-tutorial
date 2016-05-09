import {Component} from '@angular/core';
import {UserService} from '../services/user-service';
import {RouterLink, ROUTER_DIRECTIVES} from '@angular/router-deprecated'

@Component({
    selector: 'users',
    providers: [UserService],
    template: `
        <div *ngIf="!users">Loading users...</div>
        <ul *ngIf="users">
            <li *ngFor="let user of users">
                <a [routerLink]="['User', {id:user.id}]">{{user.name}}</a>
            </li>
        </ul>
    `,
    directives: [RouterLink, ROUTER_DIRECTIVES]
})
export class UsersList {

    private users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe((users) =>  { this.users = users; });
    }

}
