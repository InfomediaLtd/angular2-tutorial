import {UsersList} from "./components/users-list"
import {UsersListWithDetails} from "./components/users-list-with-details"
import {UserView} from "./components/user-view"
import {UserComponent} from "./components/user-component"

export const appRoutes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UsersList},
    {path: 'usersWithDetails', component: UsersListWithDetails},
    {path: 'user/:id', component: UserComponent}
]