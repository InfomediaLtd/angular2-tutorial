import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';
import {UserView} from "../views/user-view";
import {User} from "../data/user";

import {AppStore} from "../stores/app-store";
import {UserActions} from "../actions/user-actions";

@Component({
    selector: 'users-with-details',
    template: `
        <simple-list
            [list]="users"
            [content]="getContent"
            [link]="getLink"
            (current)="selectCurrentUser($event)">
        </simple-list>
        <user *ng-if="currentUser" [user]="currentUser" class="border:1px solid black"></user>
    `,
    directives: [CORE_DIRECTIVES, SimpleList, UserView]
})
export class UsersListWithDetails {

    public users:User[];
    public currentUser:User;

    constructor(private _appStore:AppStore,
                private _userActions:UserActions) {

        _appStore.subscribe((state) => {
            this.users = state.users;
            this.currentUser = state.current;
        });
        _appStore.dispatch(_userActions.fetchUsers());
    }

    selectCurrentUser(user:User) { this._appStore.dispatch(this._userActions.setCurrentUser(user));}
    getContent(user:User):string { return user.name; }
    getLink(user:User):any[] { return ['User', {id:user.id}]; }

}