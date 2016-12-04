import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement}    from '@angular/core';
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {LabelWithValue} from "../../../app/views/label-with-value.view"
import {User} from "../../../app/data/user";
import {Address} from "../../../app/data/address";
import {UserView} from "../../../app/views/user.view";

let fixture: ComponentFixture<UserView>;
let componentInstance:UserView;
let nativeElement:HTMLElement;

describe('UserView', () => {

    const user:User = {
      id: "id1", name: "name1", email: "email1", username: "username1",
      address: <Address>{ street: "street1", city: "city1" }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule.forRoot()
            ],
            declarations: [UserView, LabelWithValue],
        });
        fixture = TestBed.createComponent(UserView);
        componentInstance = fixture.debugElement.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
    });    

    it('renders successfully', () => {
        expect(nativeElement.innerHTML).not.toContain("md-card-title");
        expect(nativeElement.innerHTML).not.toContain("label-with-value");
        componentInstance.user = user;
        fixture.detectChanges();
        expect(nativeElement.innerHTML).toContain("md-card-title");
        expect(nativeElement.innerHTML).toContain("label-with-value");
    });

    it('renders user prperties1', () => {
        componentInstance.user = user;
        fixture.detectChanges();

        expect(nativeElement.innerHTML).toContain(`<span>${user.id}</span>`);
        expect(nativeElement.innerHTML).toContain(`<span>${user.name}</span>`);
        expect(nativeElement.innerHTML).toContain(`<span>${user.email}</span>`);
        expect(nativeElement.innerHTML).toContain(`<span>${user.username}</span>`);
        expect(nativeElement.innerHTML).toContain(`<span>${user.address.street}, ${user.address.city}</span>`);
    }); 
});
