import {
    it,
    describe,
    expect,
    inject,
    TestComponentBuilder as TCB,
    ComponentFixture,
    beforeEachProviders
} from '@angular/core/testing';
import {Component, provide, DirectiveResolver} from '@angular/core';
import {Location} from '@angular/common';
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT, RouteConfig} from '@angular/router-deprecated';
import {SpyLocation} from '@angular/src/mock/location_mock';
import {RootRouter} from '@angular/src/router-deprecated/router';
import {UsersList} from "../../../app/components/users-list";
import {AppStore} from "angular2-redux";
import {UserActions} from "../../../app/actions/user-actions";

const USERS_LIST = [{name:"user1"},{name:"user2"}];
const STATE = {users:USERS_LIST};

const mockAppStore = new AppStore({
  subscribe: (callback) => this.callback = callback,
  dispatch: () => this.callback(),
  getState: () => STATE
});
class MockUserActions {
  fetchUsers = () => mockAppStore.dispatch(null)
}

@Component({
  template: '<users></users>',
  directives: [UsersList]
})
@RouteConfig([{path: "/", component: UsersList, name: "User"}])
class TestComponent {}

export function main() {

    describe('UsersList', () => {

      beforeEachProviders(() => [
          provide(AppStore, {useValue: mockAppStore}),
          RouteRegistry,
          provide(Location, {useClass: SpyLocation}),
          provide(ROUTER_PRIMARY_COMPONENT, {useValue: TestComponent}),
          provide(Router, {useClass: RootRouter})
      ]);

      it('renders list', inject([TCB], (tcb:TCB) => {
            return tcb
              .overrideProviders(UsersList, [provide(UserActions, {useClass: MockUserActions})])
              .createAsync(TestComponent).then((fixture:ComponentFixture) => {
                const componentInstance:TestComponent = fixture.debugElement.componentInstance;
                fixture.detectChanges();
                const textContent = fixture.debugElement.nativeElement.textContent;

                let textElements = textContent
                    .split(" ")
                    .map(value => value.trim())
                    .filter(value => value.length>0)
                    .reduce((set, value) => {
                        set.add(value);
                        return set;
                    }, new Set());

                expect(textElements.size).toEqual(2);
                USERS_LIST.forEach(user => expect(textElements.has(user.name)).toBe(true));
            });
        }));

    });
}
