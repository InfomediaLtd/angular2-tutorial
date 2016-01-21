import {Component, Input} from 'angular2/core';

@Component({
    selector: 'label-with-value',
    template: `
        <div class="form-group">
            <label class="col-sm-2 control-label">{{label}}</label>
            <div class="col-sm-10">
                <p class="form-control-static">{{value}}</p>
            </div>
        </div>
    `
})
export class LabelWithValue {

    @Input() public label:string;
    @Input() public value:string;

}
