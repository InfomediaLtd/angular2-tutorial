import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
    selector: 'label-with-value',
    template: `
        <div class="form-group">
            <label class="col-sm-2 control-label">{{label}}</label>
            <div class="col-sm-10">
                <p class="form-control-static">{{value}}</p>
            </div>
        </div>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelWithValue {

    @Input() private label:string;
    @Input() private value:string;

}
