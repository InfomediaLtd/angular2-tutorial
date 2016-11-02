import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {RandomColorDirective} from './random-color-directive'

@NgModule({
  imports:[BrowserModule],
  declarations:[AppComponent,RandomColorDirective],
  bootstrap:[AppComponent]
})
export class AppModule {
    
}