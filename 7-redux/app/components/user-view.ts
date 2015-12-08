import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, Input} from 'angular2/angular2';
import {UserService} from '../services/user-service';
import {RouterLink, RouteParams} from 'angular2/router'
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
            <hr/>
            <a *ng-if="userId" [router-link]="['Users']">Show all users</a>
        </div>

    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink]
})
export class UserView {

    private userId:string;

    @Input() private user:User;

    constructor(service:UserService, params: RouteParams) {
        this.userId = params.get("id");
        if (this.userId) {
            service.get(this.userId).subscribe((user) => {
                this.user = user;
            });
        }
    }

}