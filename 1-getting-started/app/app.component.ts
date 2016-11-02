import {Component} from '@angular/core';
import {RandomColorDirective} from "./random-color-directive";

@Component({
    selector: "my-app",
    template: `<h3 randomColor>{{title}}</h3>`
})
export class AppComponent {
    private title:string = "Angular 2.0 is in the house.";
}
