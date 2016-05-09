import {Component, Input, OnDestroy} from "@angular/core";
import {RouterLink, RouteParams} from "@angular/router-deprecated"
import {User} from "../data/user";
import {UserView} from "../views/user-view";
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";
import {getCurrentUser} from "../reducers/users-reducer";

@Component({
    selector: "user-component",
    providers: [UserActions],
    template: `
        <div [hidden]="currentUser">Loading...</div>
        <user [user]="currentUser"></user>
        <hr/>
        <a [routerLink]="['Users']">Show all users</a>
    `,
    directives: [RouterLink, UserView]
})
export class UserComponent implements OnDestroy {

    @Input() private currentUser:User;
    private unsubscribeFromStore:()=>void;

    constructor(private _appStore:AppStore,
                private _userActions:UserActions,
                params: RouteParams) {

        this.unsubscribeFromStore = _appStore.subscribe(state => this.currentUser = getCurrentUser(state));
        _appStore.dispatch(_userActions.fetchUser(params.get("id")));
    }

    public ngOnDestroy() {
      this._appStore.dispatch(this._userActions.setCurrentUser(null));
      this.unsubscribeFromStore();
    }
}
