import {UsersList} from "./components/users-list.component"
import {UsersListWithDetails} from "./components/users-list-with-details.component"
import {UserComponent} from "./components/user.component"

export const appRoutes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UsersList},
    {path: 'usersWithDetails', component: UsersListWithDetails},
    {path: 'user/:id', component: UserComponent}
]