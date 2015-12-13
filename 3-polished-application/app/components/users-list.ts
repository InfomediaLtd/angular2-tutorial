import {Component} from 'angular2/core';
import {UserService} from '../services/user-service';
import {RouterLink} from 'angular2/router'

@Component({
    selector: 'users',
    template: `
        <div *ngIf="!users">
            Loading users...
        </div>
        <table *ngIf="users" class="table table-striped table-bordered table-hover">
            <tbody>
                <tr *ngFor="#user of users">
                    <td><a [routerLink]="['User', {id:user.id}]">{{user.name}}</a></td>
                </tr>
            </tbody>
        </table>
    `,
    directives: [RouterLink]
})
export class UsersList {

    private users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe((users) =>  { this.users = users; });
    }

}