import {Component, CORE_DIRECTIVES} from 'angular2/core';
import {SimpleList} from 'InfomediaLtd/angular2-simple-list/app/components/simple-list.ts!';
import {UserView} from "../views/user-view";
import {User} from "../data/user";

import {AppStore} from "angular2-redux";
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
        <user *ngIf="currentUser" [user]="currentUser" class="border:1px solid black"></user>
    `,
    directives: [SimpleList, UserView]
})
export class UsersListWithDetails {

    private users:User[];
    private currentUser:User;

    private selectCurrentUser;

    constructor(appStore:AppStore, userActions:UserActions) {

        this.selectCurrentUser = userActions.createDispatcher(appStore, userActions.setCurrentUser);

        appStore.subscribe((state) => {
            this.users = state.users;
            this.currentUser = state.current;
        });

        appStore.dispatch(userActions.fetchUsers());
    }

    getContent(user:User):string { return user.name; }
    getLink(user:User):any[] { return ['User', {id:user.id}]; }

}