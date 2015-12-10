import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {User} from "../data/user";
import {Actions} from "../../jspm_packages/npm/angular2-redux@1.0.3/src/actions";

export const REQUEST_USERS:string = 'REQUEST_USERS';
export const RECEIVE_USERS:string = 'RECEIVE_USERS';
export const CURRENT_USER:string = 'CURRENT_USER';

const BASE_URL:string = "http://jsonplaceholder.typicode.com/users";

@Injectable()
export class UserActions extends Actions {

    constructor(private _http:Http) {
    }

    fetchUsers() {
        return (dispatch) => {
            dispatch(this.requestUsers());

            this._http.get(`${BASE_URL}`)
                .map(result => result.json())
                .map(users =>  dispatch(this.receiveUsers(users)))
                .subscribe();
        };
    }
    fetchUser(userId) {
        return (dispatch) => {
            dispatch(this.setCurrentUser(null));

            this._http.get(`${BASE_URL}/${userId}`)
                .map(result => result.json())
                .map(user =>  dispatch(this.setCurrentUser(user)))
                .subscribe();
        };
    }

    requestUsers() {
        return {type: REQUEST_USERS};
    }

    receiveUsers(users:User[]) {
        return {
            type: RECEIVE_USERS,
            users
        }
    }

    setCurrentUser(current:User) {
        return {
            type: CURRENT_USER,
            current
        }
    }

}



