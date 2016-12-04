import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, ChangeDetectionStrategy}  from '@angular/core';
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {RouterModule}   from '@angular/router'
import {User} from "../../../app/data/user";
import {UsersList} from "../../../app/components/users-list.component";
import {SimpleList} from "angular2-simple-list"
import {AppStore} from "angular2-redux";
import {UserActions} from "../../../app/actions/user.actions";
import {Observable} from "rxjs";

let fixture: ComponentFixture<TestComponent>;
let componentInstance:TestComponent;
let nativeElement:HTMLElement;

const USERS_NAMES = ["user1","user2"];
const users = USERS_NAMES.map(name => ({name}))
const STATE = {users};

const appStoreMock = {
    subscribe: (callback) => this.callback = callback
    dispatch: () =>this.callback(STATE)    
}

const userActionsMock = {
    fetchUsers: () => null
}

describe('UsersList', () => {

    beforeEach(() => {
        spyOn(userActionsMock,"fetchUsers");

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule.forRoot(),
                RouterModule.forRoot([], {useHash: true})
            ],
            declarations: [SimpleList, UsersList, TestComponent],
            providers: [{ provide: AppStore, useValue: appStoreMock}, { provide: UserActions, useValue: userActionsMock}],
        });
        fixture = TestBed.createComponent(TestComponent);
        componentInstance = fixture.debugElement.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
    }); 

    it('renders list', () => {

        fixture.detectChanges();

        const userActionsMockSpy = userActionsMock.fetchUsers;

        expect(userActionsMockSpy).toHaveBeenCalled();
        expect(userActionsMockSpy.calls.count()).toEqual(1);

        const textContent = nativeElement.textContent;
        let arr = nativeElement.textContent
            .split(" ")
            .map(value => value.trim())
            .filter(value => value.length>0);

        expect(arr.length).toEqual(2);
        expect(arr).toEqual(USERS_NAMES);

    });

});

@Component({
  template: '<users></users>'
})
class TestComponent {}