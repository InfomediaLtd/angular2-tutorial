import reducer from "../../../app/reducers/users.reducer";
import {UserActionType} from "../../../app/actions/user.actions";

describe("Users Reducer", function () {

    it("defaults work well", () => {
        const STATE = {users:[]};
        // same state object
        expect(reducer(STATE,{type:"?"})).toBe(STATE);
        // empty state object
        expect(typeof reducer(undefined,{type:"?"})).toBe("object");
        expect(Object.keys(reducer(undefined,{type:"?"})).length).toBe(0);
    });

    it("REQUEST_USERS works well", () =>
        expect(reducer({},{type:UserActionType.REQUEST_USERS}).isFetching).toBe(true));

    it("RECEIVE_USERS works well", () => {
        const USERS = [{name:"name1"}];
        expect(reducer({},{type:UserActionType.RECEIVE_USERS}).isFetching).toBe(false);
        expect(reducer({},{type:UserActionType.RECEIVE_USERS,users:USERS}).users).toBe(USERS);
    });

    it("CURRENT_USER works well", () => {
        const USER = {name:"current1"};
        expect(reducer({},{type:UserActionType.CURRENT_USER,current:USER}).current).toBe(USER);
    });
  
});
