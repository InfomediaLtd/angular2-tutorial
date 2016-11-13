import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user.actions";

@Component({
    selector: 'user',
    template: `
        <div *ngIf="!user">Loading user...</div>
        <div *ngIf="user">
            <user-view [user]="user"></user-view>
            <hr/>
            <a [routerLink]="['/users']">Show all users</a>
        </div>
    `
})
export class UserComponent implements OnDestroy {

    private user:any;

    constructor(private appStore:AppStore, private userActions:UserActions, route: ActivatedRoute) {
        appStore.subscribe(state => this.user=state.current);
        route.params.forEach((params: Params) => {
            var userId = params["id"];
            if (userId) {
                appStore.dispatch(userActions.fetchUser(userId));
            }
        });
    }
    
    ngOnDestroy() {
      this.appStore.dispatch(this.userActions.setCurrentUser(null));
    }

}
