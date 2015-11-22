import {Http} from "angular2/http";
import {Injectable, Inject} from "angular2/core";
import {User} from "../data/user";
import {Observable} from "@reactivex/rxjs";

@Injectable()
export class UserService {

    private BASE_URL:string = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http:Http) {
    }

    list():Observable<User[]> {
        return this._http.get(`${this.BASE_URL}`)
            .map(result => result.json());
    }

    get(userId:string):Observable<User> {
        return this._http.get(`${this.BASE_URL}/${userId}`)
            .map(result => result.json());
    }
}