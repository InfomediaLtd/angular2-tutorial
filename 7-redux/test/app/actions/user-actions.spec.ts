import {it, describe, expect} from 'angular2/testing';
import {UserActions, REQUEST_USERS, RECEIVE_USERS, CURRENT_USER} from "../../../app/actions/user-actions";
import {User} from "../../../app/data/user";
import {Http, Response, RequestOptionsArgs} from "angular2/http";
import * as Rx from "rxjs";

class HttpMock extends Http {
    constructor(private response) {
      super(null,null);
    }
    get(url:string, options?:RequestOptionsArgs):Rx.Observable<Response> {
      return Rx.Observable.from(this.response);
    }
}

export function main() {
  describe('UserActions', () => {

    it('fetchUsers should work', () => {
        const USERS = [<User>{name:"name1"}];

        const httpMock = new HttpMock([{ json: () => USERS }]);
        spyOn(httpMock,"get").and.callThrough();

        const appStoreMock = { dispatch: null }
        spyOn(appStoreMock,"dispatch");

        const fetchUsers = new UserActions(httpMock).fetchUsers();
        expect(typeof fetchUsers).toEqual("function");
        fetchUsers(appStoreMock.dispatch);

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy.calls.count()).toEqual(2);
        expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: REQUEST_USERS});
        expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: RECEIVE_USERS, users:USERS});

        const httpGetSpy = httpMock.get;
        expect(httpGetSpy).toHaveBeenCalled();
        expect(httpGetSpy.calls.count()).toEqual(1);
        expect(httpGetSpy.calls.first().args[0]).toEqual("http://jsonplaceholder.typicode.com/users");

    });

    it('fetchUser should work', () => {
        const USER_ID = "111";
        const USER = <User>{name:"name1"};

        const httpMock = new HttpMock([{ json: () => USER }]);
        spyOn(httpMock,"get").and.callThrough();

        const appStoreMock = { dispatch: null }
        spyOn(appStoreMock,"dispatch");

        const fetchUser = new UserActions(httpMock).fetchUser(USER_ID);
        expect(typeof fetchUser).toEqual("function");
        fetchUser(appStoreMock.dispatch);

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy.calls.count()).toEqual(2);
        expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: CURRENT_USER, current:null});
        expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: CURRENT_USER, current:USER});

        const httpGetSpy = httpMock.get;
        expect(httpGetSpy).toHaveBeenCalled();
        expect(httpGetSpy.calls.count()).toEqual(1);
        expect(httpGetSpy.calls.first().args[0]).toEqual(`http://jsonplaceholder.typicode.com/users/${USER_ID}`);

    });

    it('requestUsers should work', () =>
        expect(new UserActions(null).requestUsers().type).toEqual(REQUEST_USERS));

    it('receiveUsers should work', () => {
        const USERS = [<User>{name:"name1"}];
        expect(new UserActions(null).receiveUsers(USERS).type).toEqual(RECEIVE_USERS);
        expect(new UserActions(null).receiveUsers(USERS).users).toEqual(USERS);
    });

    it('setCurrentUser should work', () => {
        const USER = <User>{name:"current1"};
        expect(new UserActions(null).setCurrentUser(USER).type).toEqual(CURRENT_USER);
        expect(new UserActions(null).setCurrentUser(USER).current).toEqual(USER);
    });

  });
}
