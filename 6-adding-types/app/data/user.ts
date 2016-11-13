import {Address} from "./address";

export interface User {
    id:string;
    name:string;
    username:string;
    email:string;
    address:Address;
}
