import {Component, Input, ChangeDetectionStrategy} from "angular2/core";
import {LabelWithValue} from "./label-with-value";
import {User} from "../data/user";
import { COMMON_DIRECTIVES } from "angular2/src/common/common_directives";

@Component({
    selector: "user",
    template: `
      <form *ngIf="user" class="form-horizontal">
          <label-with-value label="ID" value="{{user.id}}"></label-with-value>
          <label-with-value label="Name" value="{{user.name}}"></label-with-value>
          <label-with-value label="Username" value="{{user.username}}"></label-with-value>
          <label-with-value label="Email" value="{{user.email}}"></label-with-value>
          <label-with-value label="Address" value="{{user.address.street}}, {{user.address.city}}"></label-with-value>
      </form>
    `,
     directives: [COMMON_DIRECTIVES, LabelWithValue],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserView {
    @Input() public user:User;
}
