import {Component, OnDestroy} from "@angular/core";
import {SimpleList} from "angular2-simple-list";
import {UserView} from "../views/user-view";
import {User} from "../data/user";

import {getUsers,getCurrentUser} from "../reducers/users-reducer";

import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";

@Component({
    selector: "users-with-details",
    providers: [UserActions],
    template: `
      <div class="row">
        <simple-list class="col s-4"
          [list]="users"
          [content]="getContent"
          [link]="getLink"
          (current)="selectCurrentUser($event)">
        </simple-list>
        <div class="col s-7 offset-s-1">
          <br/>
          <user *ngIf="currentUser" [user]="currentUser"></user>
        </div>
      <div>

    `,
    directives: [SimpleList, UserView]
})
export class UsersListWithDetails implements OnDestroy {

    private users:User[];
    private currentUser:User;
    private selectCurrentUser;
    private unsubscribeFromStore:()=>void;

    constructor(appStore:AppStore, userActions:UserActions) {

        this.selectCurrentUser = userActions.createDispatcher(userActions.setCurrentUser);

        this.unsubscribeFromStore = appStore.subscribe(state => {
            this.users = getUsers(state);
            this.currentUser = getCurrentUser(state);
        });

        appStore.dispatch(userActions.fetchUsers());
    }

    public getContent(user:User):string { return user.name; }
    public getLink(user:User):any[] { return ["User", {id:user.id}]; }

    public ngOnDestroy() {
      this.unsubscribeFromStore();
    }
}
