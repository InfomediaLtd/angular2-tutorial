import {Injectable} from "@angular/core";
import {User} from "../data/user";
import 'rxjs/add/operator/map';
import {UserService} from "../services/user.service";
import {AppStore,Actions} from "angular2-redux";

export const REQUEST_USERS:string = 'REQUEST_USERS';
export const RECEIVE_USERS:string = 'RECEIVE_USERS';
export const CURRENT_USER:string = 'CURRENT_USER';

@Injectable()
export class UserActions extends Actions {

    constructor(appStore:AppStore, private userService:UserService) {
        super(appStore);
    }

    fetchUsers() {
        return dispatch => {
            dispatch(this.requestUsers());
            this.userService.list()
                .map(user =>  dispatch(this.receiveUsers(user)))
                .subscribe();
        };
    }
	fetchUser(userId) {
    	return dispatch => {
        	dispatch(this.setCurrentUser(null));
            this.userService.get(userId)
            	.map(user =>  dispatch(this.setCurrentUser(user)))
            	.subscribe();
    	};
	}
    requestUsers  ()             { return {type: REQUEST_USERS}; }
    receiveUsers  (users:User[]) { return {type: RECEIVE_USERS, users} }
    setCurrentUser(current:User) { return {type: CURRENT_USER, current} }
}