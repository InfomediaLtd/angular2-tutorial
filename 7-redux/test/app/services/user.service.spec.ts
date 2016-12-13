import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {UserService} from "../../../app/services/user.service";
import {User} from "../../../app/data/user";
import {Http, HttpModule, XHRBackend, Response, ResponseOptions} from "@angular/http";

describe('UserService', () => {

    const USER = <User>{name:"name1"};
    const USERS = [USER];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UserService, { provide: XHRBackend, useClass: MockBackend }],
        });
    });  

    it('list should work', inject([UserService, XHRBackend], (userService, mockBackend) => {
        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({body: USERS})));
        });
        userService.list().subscribe(users => {
            expect(users).toContain(USER);
            expect(users.length).toBe(1);
        });
    }));

    it('get should work', inject([UserService, XHRBackend], (userService, mockBackend) => {
        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({body: USER})));
        });
        userService.get().subscribe(user => {
            expect(user).toBe(USER);
        });
    }));

});