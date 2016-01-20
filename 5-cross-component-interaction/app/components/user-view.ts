import {Component, Input} from 'angular2/core';
import {LabelWithValue} from "./label-with-value";

@Component({
    selector: 'user',
    template: `
        <form *ngIf="user" class="form-horizontal">
            <label-with-value label="ID" value="{{user.id}}"></label-with-value>
            <label-with-value label="Name" value="{{user.name}}"></label-with-value>
            <label-with-value label="Username" value="{{user.username}}"></label-with-value>
            <label-with-value label="Email" value="{{user.email}}"></label-with-value>
            <label-with-value label="Address" value="{{user.address.street}}, {{user.address.city}}"></label-with-value>
        </form>
    `,
    directives: [LabelWithValue]
})
export class UserView {

    @Input() private user:any;

}
