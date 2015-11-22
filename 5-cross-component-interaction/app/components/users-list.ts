import {Component} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';

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

    public users:any[];

    constructor(service:UserService) {
        service.list().subscribe((users) => { this.users = users; });
    }

    getContent(user):string { return user.name; }
    getLink(user):any[] { return ['User', {id:user.id}]; }

}