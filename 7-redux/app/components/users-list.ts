import {Component} from 'angular2/core';
import {SimpleList} from 'angular2-simple-list';
import {User} from "../data/user";

import {AppStore} from "angular2-redux";
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

    private users:User[];

    private getContent = (user:User) => user.name;
    private getLink    = (user:User) => ['User', {id:user.id}];

    constructor(appStore:AppStore, userActions:UserActions) {
        appStore.subscribe(state => this.users = state.users);
        appStore.dispatch(userActions.fetchUsers());
    }

}