import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, Input, ChangeDetectionStrategy} from 'angular2/angular2';
import {User} from "../data/user";

@Component({
    selector: 'user',
    template: `
        <div *ng-if="user">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-2 control-label">ID</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{user.id}}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">Name</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{user.name}}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">Username</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{user.username}}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">Email</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{user.email}}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">Address</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{user.address.street}}, {{user.address.city}}</p>
                    </div>
                </div>
            </form>
        </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserView {
    @Input() private user:User;
}