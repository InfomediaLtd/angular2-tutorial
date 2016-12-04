import {TestBed, inject} from '@angular/core/testing';
import {AppStore} from 'angular2-redux';
import {UserActions, UserActionType} from "../../../app/actions/user.actions";
import {UserService} from "../../../app/services/user.service";
import {User} from "../../../app/data/user";
import {Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {Observable} from "rxjs";

describe('UserActions', () => {

    const appStoreMock = { dispatch: null }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UserService, UserActions, { provide: AppStore, useValue: appStoreMock}],
        });
    });  

    it('fetchUsers should work', inject([Http, UserActions], (http: Http, userActions:UserActions) => {

        const USERS = [<User>{name:"name1"}];

        spyOn(http, "get").and.returnValue(Observable.from([
            new Response(new ResponseOptions({body: USERS}))
        ]));
        spyOn(appStoreMock,"dispatch");

        const fetchUsers = userActions.fetchUsers();
        expect(typeof fetchUsers).toEqual("function");

        fetchUsers(appStoreMock.dispatch);

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy.calls.count()).toEqual(2);
        expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: UserActionType.REQUEST_USERS});
        expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: UserActionType.RECEIVE_USERS, users:USERS});

        const httpGetSpy = http.get;
        expect(httpGetSpy).toHaveBeenCalled();
        expect(httpGetSpy.calls.count()).toEqual(1);
        expect(httpGetSpy.calls.first().args[0]).toEqual("http://jsonplaceholder.typicode.com/users");

    }));

    it('fetchUser should work', inject([Http, UserActions], (http: Http, userActions:UserActions) => {

        const USER_ID = "111";
        const USER = <User>{name:"name1"};

        spyOn(http, "get").and.returnValue(Observable.from([
            new Response(new ResponseOptions({body: USER}))
        ]));

        spyOn(appStoreMock,"dispatch");

        const fetchUser = userActions.fetchUser(USER_ID);
        expect(typeof fetchUser).toEqual("function");
        fetchUser(appStoreMock.dispatch);

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy.calls.count()).toEqual(2);
        expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: UserActionType.CURRENT_USER, current:null});
        expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: UserActionType.CURRENT_USER, current:USER});

        const httpGetSpy = http.get;
        expect(httpGetSpy).toHaveBeenCalled();
        expect(httpGetSpy.calls.count()).toEqual(1);
        expect(httpGetSpy.calls.first().args[0]).toEqual(`http://jsonplaceholder.typicode.com/users/${USER_ID}`);

    }));

    it('requestUsers should work', () =>
        expect(new UserActions(null,null).requestUsers().type).toEqual(UserActionType.REQUEST_USERS));

    it('receiveUsers should work', () => {
        const USERS = [<User>{name:"name1"}];
        expect(new UserActions(null,null).receiveUsers(USERS).type).toEqual(UserActionType.RECEIVE_USERS);
        expect(new UserActions(null,null).receiveUsers(USERS).users).toEqual(USERS);
    });

    it('setCurrentUser should work', () => {
        const USER = <User>{name:"current1"};
        expect(new UserActions(null,null).setCurrentUser(USER).type).toEqual(UserActionType.CURRENT_USER);
        expect(new UserActions(null,null).setCurrentUser(USER).current).toEqual(USER);
    });

});