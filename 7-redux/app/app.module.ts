import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule}   from '@angular/router'
import {HttpModule} from "@angular/http"
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {AppComponent} from './app.component'
import {UsersList} from "./components/users-list.component"
import {UsersListWithDetails} from "./components/users-list-with-details.component"
import {UserView} from "./views/user.view"
import {UserComponent} from "./components/user.component"
import {LabelWithValue} from "./views/label-with-value.view"
import {SimpleList} from "angular2-simple-list"
import {UserService} from "./services/user.service"
import {appRoutes} from "./app.routes"

import {UserActions} from "./actions/user.actions";

import {AppStore,createAppStoreFactory} from "angular2-redux";
import usersReducer from "./reducers/users.reducer"

const appStoreFactory = createAppStoreFactory(usersReducer);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  declarations: [AppComponent,UsersList,UserView,SimpleList,UsersListWithDetails,UserComponent,LabelWithValue],
  providers: [UserService, UserActions, { provide: AppStore, useFactory: appStoreFactory }],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}