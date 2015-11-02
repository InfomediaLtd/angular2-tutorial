import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {RouterLink} from 'angular2/router'

@Component({
    selector: 'users',
    template: `
        <div *ng-if="!users">
            Loading users...
        </div>
        <div *ng-if="users">
            <ul>
                <li *ng-for="#user of users">
                    <a [router-link]="['User', {id:user.id}]">{{user.name}}</a>
                </li>
            </ul>
            <users/>
        </div>
    `,
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class UsersList {

    public users:any[] = null;

    constructor(service:UserService) {
        service.list().subscribe((users) =>  { this.users = users; });
    }

}