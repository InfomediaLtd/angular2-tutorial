import {Component} from 'angular2/core'

@Component({
    selector: "my-app",
    template: `<h3 [style.color]="color" (click)="updateColor()">{{title}}</h3>`
})
export class AppComponent {
    private title:string = "Angular 2.0 is in the house.";
    private color:string;
  	constructor() {
  		this.updateColor();
  	}
    getColor() {
      return "#"+((1<<24)*Math.random()|0).toString(16);
    }
    updateColor() {
      this.color = this.getColor();
    }
}
