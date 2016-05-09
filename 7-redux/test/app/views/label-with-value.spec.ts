import {
    it,
    describe,
    expect,
    inject,
    TestComponentBuilder as TCB,
    ComponentFixture
} from '@angular/core/testing';
import {Component} from '@angular/core';
import {LabelWithValue} from "../../../app/views/label-with-value";

export function main() {

    describe('LabelWithValue', () => {

      it('renders prperties', inject([TCB], (tcb:TCB) => {
            return tcb.createAsync(LabelWithValue).then((fixture:ComponentFixture) => {

                const componentInstance:LabelWithValue = fixture.debugElement.componentInstance;
                componentInstance.label = "testLabel";
                componentInstance.value = "testValue";
                fixture.detectChanges();

                const nativeElement:HTMLElement = fixture.debugElement.nativeElement;
                const text = nativeElement.textContent.replace(/\n/g,"").replace(/ /g,"");
                expect(text).toEqual("testLabeltestValue");
            });
        }));

    });
}
