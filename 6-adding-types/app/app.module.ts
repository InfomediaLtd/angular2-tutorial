import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule}   from '@angular/router'
import {HttpModule} from "@angular/http"
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {AppComponent} from './app.component'
import {UsersList} from "./components/users-list"
import {UsersListWithDetails} from "./components/users-list-with-details"
import {UserView} from "./components/user-view"
import {UserComponent} from "./components/user-component"
import {LabelWithValue} from "./components/label-with-value"
import {SimpleList} from "angular2-simple-list"
import {UserService} from "./services/user.service"
import {appRoutes} from "./app.routes"

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  declarations: [AppComponent,UsersList,UserView,SimpleList,UsersListWithDetails,UserComponent,LabelWithValue],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}