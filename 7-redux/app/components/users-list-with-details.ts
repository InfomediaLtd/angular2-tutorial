import {Component} from "angular2/core";
import {SimpleList} from "angular2-simple-list";
import {UserView} from "../views/user-view";
import {User} from "../data/user";

import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";

@Component({
    selector: "users-with-details",
    providers: [UserActions],
    template: `
      <div class="row">
        <simple-list class="col-xs-4"
          [list]="users"
          [content]="getContent"
          [link]="getLink"
          (current)="selectCurrentUser($event)">
        </simple-list>
        <user *ngIf="currentUser" [user]="currentUser" class="col-xs-7 col-xs-offset-1"></user>
      <div>

    `,
    directives: [SimpleList, UserView]
})
export class UsersListWithDetails {

    private users:User[];
    private currentUser:User;

    private selectCurrentUser;

    constructor(appStore:AppStore, userActions:UserActions) {

        this.selectCurrentUser = userActions.createDispatcher(appStore, userActions.setCurrentUser);

        appStore.subscribe(state => {
            this.users = state.users;
            this.currentUser = state.current;
        });

        appStore.dispatch(userActions.fetchUsers());
    }

    public getContent(user:User):string { return user.name; }
    public getLink(user:User):any[] { return ["User", {id:user.id}]; }

}
