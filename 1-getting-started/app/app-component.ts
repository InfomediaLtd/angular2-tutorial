import {Component} from 'angular2/core'

@Component({
    selector: 'my-app',
    template: `<h3>{{title}}</h3>`
})
export class AppComponent {
    title:string = "Angular 2.0 is in the house.";
}