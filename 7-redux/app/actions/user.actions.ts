import {Injectable} from "@angular/core";
import {User} from "../data/user";
import 'rxjs/add/operator/map';
import {UserService} from "../services/user.service";
import {AppStore,Actions} from "angular2-redux";

export enum UserActionType {
  REQUEST_USERS = 'REQUEST_USERS' as any,
  RECEIVE_USERS = 'RECEIVE_USERS' as any,
  CURRENT_USER = 'CURRENT_USER' as any
}

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
    requestUsers  ()             { return {type: UserActionType.REQUEST_USERS}; }
    receiveUsers  (users:User[]) { return {type: UserActionType.RECEIVE_USERS, users} }
    setCurrentUser(current:User) { return {type: UserActionType.CURRENT_USER, current} }
}