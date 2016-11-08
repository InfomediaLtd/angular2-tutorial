import {UsersList} from "./components/users-list"
import {UserView} from "./components/user-view"

export const appRoutes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UsersList},
    {path: 'user/:id', component: UserView}
]