import {Http} from "angular2/http";
import {Injectable, Inject} from "angular2/core";

@Injectable()
export class UserService {

    private BASE_URL:string = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http:Http) {
    }

    list() {
        return this._http.get(`${this.BASE_URL}`)
            .map(result => result.json());
    }

    get(userId:string) {
        return this._http.get(`${this.BASE_URL}/${userId}`)
            .map(result => result.json());
    }
}