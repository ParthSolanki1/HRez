import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class authenticationService {

    loggedin;
    firstName;
    lastName;

    constructor(public http: HttpClient) {
        this.loggedin = false;
    }

    registrationAuth(user, pass, first, last, emailGiven) {
        const data = {username: user, password:pass, firstName:first, lastName:last, email:emailGiven};
        
        return this.http.post('/api/register', JSON.stringify(data), {headers: new HttpHeaders({'Content-type': 'application/json'}), observe: 'response'});
    }

    loginAuth(user, pass){
        const data = {username: user, password: pass};

        return this.http.post('/api/login', JSON.stringify(data), {headers: new HttpHeaders({'Content-type': 'application/json'}), observe: 'response'})
    }

    isLoggedIn() {
        return this.http.get('/api/checklogin', {observe: 'response'});
    }

    logout() {
        return this.http.get('/api/logout');
    }

    getUserInfo() {
        return this.http.get('/api/userinfo');
    }

}