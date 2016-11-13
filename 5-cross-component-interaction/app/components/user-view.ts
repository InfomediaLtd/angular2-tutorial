import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'user-view',
    template: `
        <div>
            <md-card *ngIf="user">
                <md-card-title>{{user.name}}</md-card-title>   
                <label-with-value [label]="'ID'" [value]="user.id"></label-with-value>
                <label-with-value [label]="'Name'" [value]="user.name"></label-with-value>
                <label-with-value [label]="'Username'" [value]="user.username"></label-with-value>
                <label-with-value [label]="'Email'" [value]="user.email"></label-with-value>
                <label-with-value [label]="'Address'" [value]="user.address.street + ', ' + user.address.city"></label-with-value>
            </md-card>
        </div>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserView {
    @Input() private user:any;
}