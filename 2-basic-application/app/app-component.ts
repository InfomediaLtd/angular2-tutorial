import {Component} from 'angular2/angular2'
import {UsersList} from './components/users-list'

@Component({
    selector: 'my-app',
    template: `
        <users/>
    `,
    directives: [UsersList]
})
export class AppComponent {
}