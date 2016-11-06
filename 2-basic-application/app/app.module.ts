import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule}   from '@angular/router'
import {HttpModule} from "@angular/http";
import {AppComponent} from './app.component'
import {UsersList} from "./components/users-list"
import {UserView} from "./components/user-view"
import {UserService} from "./services/user.service"

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/users', pathMatch: 'full'},
      {path: 'users', component: UsersList},
      {path: 'user/:id', component: UserView}
    ], {
      useHash: true
    })
  ],
  declarations: [AppComponent,UsersList,UserView],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}