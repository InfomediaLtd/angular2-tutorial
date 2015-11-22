import {Component} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';
import {User} from "../data/user";

@Component({
    selector: 'users',
    template: `
        <simple-list
            [list]="users"
            [content]="getContent"
            [link]="getLink">
        </simple-list>
    `,
    directives: [SimpleList]
})
export class UsersList {

    public users:User[];

    constructor(service:UserService) {
        service.list().subscribe((users) => { this.users = users; });
    }

    getContent(user:User):string { return user.name; }
    getLink(user):any[] { return ['User', {id:user.id}]; }

}