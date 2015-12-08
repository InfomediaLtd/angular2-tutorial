import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, Input} from 'angular2/angular2';
import {RouterLink, RouteParams} from 'angular2/router'
import {User} from "../data/user";
import {UserView} from "../views/user-view";

import {AppStore} from "../stores/app-store";
import {UserActions} from "../actions/user-actions";

@Component({
    selector: 'user-component',
    template: `
        <div [hidden]="currentUser">Loading...</div>
        <user [user]="currentUser"></user>
        <hr/>
        <a [router-link]="['Users']">Show all users</a>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink, UserView]
})
export class UserComponent {

    @Input() private currentUser:User;

    constructor(private _appStore:AppStore,
                private _userActions:UserActions,
                params: RouteParams) {

        _appStore.subscribe(state => this.currentUser = state.current);
        _appStore.dispatch(_userActions.fetchUser(params.get("id")));
    }

    onDestroy() { this._appStore.dispatch(this._userActions.setCurrentUser(null)); }
}