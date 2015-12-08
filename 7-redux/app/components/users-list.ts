import {Component} from 'angular2/angular2';
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';
import {User} from "../data/user";

import {AppStore} from "../stores/app-store";
import {UserActions} from "../actions/user-actions";

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

    constructor(private _appStore:AppStore,
                private _userActions:UserActions) {

        _appStore.subscribe((state) => { this.users = state.users; });
        _appStore.dispatch(_userActions.fetchUsers());

    }

    getContent(user:User):string { return user.name; }
    getLink(user):any[] { return ['User', {id:user.id}]; }

}