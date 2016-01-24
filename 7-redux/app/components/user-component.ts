import {Component, Input, OnDestroy} from "angular2/core";
import {RouterLink, RouteParams} from "angular2/router"
import {User} from "../data/user";
import {UserView} from "../views/user-view";
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";

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

    constructor(private _appStore:AppStore,
                private _userActions:UserActions,
                params: RouteParams) {

        _appStore.subscribe(state => this.currentUser = state.current);
        _appStore.dispatch(_userActions.fetchUser(params.get("id")));
    }

    public ngOnDestroy() { this._appStore.dispatch(this._userActions.setCurrentUser(null)); }
}
