import {Http, Headers} from "angular2/http";
import {Injectable, Inject} from "angular2/core";

@Injectable()
export class UsersService {

    constructor(private _http:Http) {
    }

    search(searchTest:string) {
        return this._http.get(`http://jsonplaceholder.typicode.com/users`)
            .map(result => result.json());
    }
}