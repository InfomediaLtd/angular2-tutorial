import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'label-with-value',
    template: `<p><label>{{label}}: </label><span>{{value}}</span></p>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelWithValue {

    @Input() private label:string;
    @Input() private value:string;

}
