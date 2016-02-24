import {Component, OnDestroy} from "angular2/core";
import {SimpleList} from "angular2-simple-list";
import {User} from "../data/user";
import {AppStore} from "angular2-redux";
import {UserActions} from "../actions/user-actions";
import {getUsers} from "../reducers/users-reducer";

@Component({
    selector: "users",
    providers: [UserActions],
    template: `
        <simple-list
            [list]="users"
            [content]="getContent"
            [link]="getLink">
        </simple-list>
    `,
    directives: [SimpleList]
})
export class UsersList implements OnDestroy {

    public users:User[];
    public getContent = (user:User) => user.name;
    public getLink    = (user:User) => ["User", {id:user.id}];

    private unsubscribeFromStore:()=>void;

    constructor(appStore:AppStore, userActions:UserActions) {
        this.unsubscribeFromStore = appStore.subscribe(state => this.users = getUsers(state));
        appStore.dispatch(userActions.fetchUsers());
    }

    public ngOnDestroy() {
      this.unsubscribeFromStore();
    }
}
