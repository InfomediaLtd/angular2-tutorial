import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component}    from '@angular/core';
import {By}              from '@angular/platform-browser';
import {LabelWithValue} from "../../../app/views/label-with-value.view";

let fixture: ComponentFixture<TestComponent>;

describe('LabelWithValue', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, LabelWithValue],
        });
        fixture = TestBed.createComponent(TestComponent);
    });    

    it('shows label and value', () => {
        fixture.detectChanges();
        expect(getTextContent(fixture)).toEqual('bla: 123');
    });

});

function getTextContent(fixture) {
    const de = fixture.debugElement.query(By.css('p'));
    const el = de.nativeElement;
    return el.textContent;  
}

@Component({
  selector: 'test-component',
  template: `<label-with-value [label]="'bla'" [value]="'123'"></label-with-value>`
})
class TestComponent {
}