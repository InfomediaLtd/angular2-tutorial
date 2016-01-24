import {Component} from "angular2/core";
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
export class UsersList {

    public users:User[];
    public getContent = (user:User) => user.name;
    public getLink    = (user:User) => ["User", {id:user.id}];

    constructor(appStore:AppStore, userActions:UserActions) {
        appStore.subscribe(state => this.users = getUsers(state));
        appStore.dispatch(userActions.fetchUsers());
    }

}
