import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {UsersService} from '../services/users-service';

@Component({
    selector: 'users',
    template: `
        <div *ng-if="!users">
            Loading users...
        </div>
        <div *ng-if="users">
            <ul>
                <li *ng-for="#user of users">
                    {{user.name}}
                </li>
            </ul>
            <users/>
        </div>
    `,
    directives: CORE_DIRECTIVES
})
export class UsersList {

    public users:any[] = null;

    constructor(service:UsersService) {
        service.search().subscribe((users) =>  { this.users = users; });
    }

}