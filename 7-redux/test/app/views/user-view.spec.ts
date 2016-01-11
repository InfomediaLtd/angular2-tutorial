import {
    it,
    describe,
    expect,
    injectAsync,
    TestComponentBuilder as TCB
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {User} from "../../../app/data/user";
import {Address} from "../../../app/data/address";
import {UserView} from "../../../app/views/user-view";

export function main() {

    const user:User = {
      id: "id1", name: "name1", email: "email1", username: "username1",
      address: <Address>{ street: "street1", city: "city1" }
    };

    describe('UserView', () => {

      it('renders successfully', injectAsync([TCB], (tcb:TCB) => {
          return tcb.createAsync(UserView).then((fixture) => {

              const {componentInstance,nativeElement} = fixture.debugElement;

              expect(nativeElement.innerHTML).not.toContain("form");

              componentInstance.user = user;
              fixture.detectChanges();
              expect(nativeElement.innerHTML).toContain("form");
          });
      }));

      it('renders user prperties', injectAsync([TCB], (tcb:TCB) => {
            return tcb.createAsync(UserView).then(fixture => {

                const componentInstance:UserView = fixture.debugElement.componentInstance;
                componentInstance.user = user;
                fixture.detectChanges();

                let toFind = new Set([
                  user.id,
                  user.name,
                  user.email,
                  user.username,
                  user.address.street,
                  user.address.city]);

                // find and delete all texts in p elements from the set
                const nativeElement:HTMLElement = fixture.debugElement.nativeElement;
                Array.from(nativeElement.querySelectorAll("p"))
                  .map(element => element.textContent)
                  .forEach(textContent => textContent
                        .split(",")
                        .map(text => text.trim())
                        .forEach(text => expect(toFind.delete(text)).toEqual(true)));

                // should have found all values
                expect(Array.from(toFind)).toEqual([]);
            });
        }));

    });
}
