import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from "../data/user";
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user.actions";
import {getUsers,getCurrentUser} from "../reducers/users.reducer";

@Component({
    selector: 'users-with-details',
    template: `
        <md-grid-list cols="2">
            <md-grid-tile>
                <simple-list
                    [list]="users"
                    [content]="getContent"
                    [link]="getLink"
                    (current)="selectCurrentUser($event)">
                </simple-list>
            </md-grid-tile>
            <md-grid-tile>
                <user-view *ngIf="currentUser" [user]="currentUser"></user-view>
            </md-grid-tile>
        </md-grid-list>          
    `
})
export class UsersListWithDetails {

    private users:any[];
    private currentUser:any;

    private selectCurrentUser;

    private getContent:(user:User)=>string = ({name}) => name;
    private getLink   :(user:User)=>any[]  = ({id}) => ['/user', id];

    constructor(appStore:AppStore, userActions:UserActions) {
        
        this.selectCurrentUser = userActions.createDispatcher(userActions.setCurrentUser);

        appStore.subscribe(state => {
            this.users       = getUsers(state);
            this.currentUser = getCurrentUser(state);
        });
        appStore.dispatch(userActions.fetchUsers());
    }

}