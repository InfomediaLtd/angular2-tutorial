import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {RouterLink} from 'angular2/router'

@Component({
    selector: 'users',
    template: `
        <div *ng-if="!users">
            Loading users...
        </div>
        <table *ng-if="users" class="table table-striped table-bordered table-hover">
            <tbody>
                <tr *ng-for="#user of users">
                    <td><a [router-link]="['User', {id:user.id}]">{{user.name}}</a></td>
                </tr>
            </tbody>
        </table>
    `,
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class UsersList {

    public users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe((users) =>  { this.users = users; });
    }

}