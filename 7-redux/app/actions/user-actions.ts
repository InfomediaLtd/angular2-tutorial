import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {User} from "../data/user";
import {Actions,AppStore} from "angular2-redux";
import "rxjs/add/operator/map";

export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const CURRENT_USER = "CURRENT_USER";

const BASE_URL = "http://jsonplaceholder.typicode.com/users";

@Injectable()
export class UserActions extends Actions {

    constructor(private _http:Http, appStore:AppStore) {
        super(appStore);
    }

    public fetchUsers() {
        return (dispatch) => {
            dispatch(this.requestUsers());

            this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(users =>  dispatch(this.receiveUsers(users)))
                .subscribe();
        };
    }
    public fetchUser(userId) {
        return (dispatch) => {
            dispatch(this.setCurrentUser(null));

            this._http.get(`${BASE_URL}/${userId}`)
                .map(result => result.json())
                .map(user =>  dispatch(this.setCurrentUser(user)))
                .subscribe();
        };
    }

    public requestUsers() {
        return {type: REQUEST_USERS};
    }

    public receiveUsers(users:User[]) {
        return {
            type: RECEIVE_USERS,
            users
        }
    }

    public setCurrentUser(current:User) {
        return {
            type: CURRENT_USER,
            current
        }
    }

}
