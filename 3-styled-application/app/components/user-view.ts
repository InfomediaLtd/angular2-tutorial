import {Component} from 'angular2/core';
import {UserService} from '../services/user-service';
import {RouterLink, RouteParams} from 'angular2/router'

@Component({
    selector: 'user',
    styles: [` * { font-size: 110%; } `],
    template: `
        <div *ngIf="!user">
            Loading user...
        </div>
        <div *ngIf="user">
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
            <a [routerLink]="['Users']">Show all users</a>
        </div>

    `,
    directives: [RouterLink]
})
export class UserView {

    private user;

    constructor(service:UserService, params: RouteParams) {
        var userId = params.get("id");
        service.get(userId).subscribe((user) =>  { this.user = user; });
    }

}