import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../data/user";
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user.actions";
import {getUsers} from "../reducers/users.reducer";

@Component({
    selector: 'users',
    providers: [UserService],
    template: `
        <simple-list
            [list]="users"
            [content]="getContent"
            [link]="getLink">
        </simple-list>
    `
})
export class UsersList {
    public users:User[];

    private getContent:(user:User)=>string = ({name}) => name;
    private getLink   :(user:User)=>any[]  = ({id}) => ['/user', id];

    constructor(private appStore:AppStore, private userActions:UserActions) {
        appStore.subscribe(state => {
            this.users       = getUsers(state);
        });
        appStore.dispatch(userActions.fetchUsers());
    }

}