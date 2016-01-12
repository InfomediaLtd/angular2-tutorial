import reducer from "../../../app/reducers/users-reducer";
import * as UserActions from "../../../app/actions/user-actions";

export function main() {
    describe("Users Reducer", function () {

      it("defaults work well", () => {
        const STATE = {users:[]};
        // same state object
        expect(reducer(STATE,{type:"?"})).toBe(STATE);
        // empty state object
        expect(typeof reducer(undefined,{type:"?"})).toBe("object");
        expect(Object.keys(reducer(undefined,{type:"?"})).length).toBe(0);
      }

      it("REQUEST_USERS works well", () =>
        expect(reducer({},{type:UserActions.REQUEST_USERS}).isFetching).toBe(true);

      it("RECEIVE_USERS works well", () =>
        const USERS = [{name:"name1"}];
        expect(reducer({},{type:UserActions.RECEIVE_USERS}).isFetching).toBe(false);
        expect(reducer({},{type:UserActions.RECEIVE_USERS,users:USERS}).users).toBe(USERS);
      }

      it("CURRENT_USER works well", () =>
        const USER = {name:"current1"};
        expect(reducer({},{type:UserActions.CURRENT_USER,current:USER}).current).toBe(USER);

    });
}
