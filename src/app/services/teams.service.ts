import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class teamsService {

    teams;
    id;
    name;
    messages;

    constructor(private http:HttpClient){}

    createTeam(name, user1, user2, user3, user4) {
        let data = {name: name, user1: user1, user2: user2, user3: user3, user4: user4};

        return this.http.post('/api/create', JSON.stringify(data), {headers: new HttpHeaders({'Content-type': 'application/json'})});
    }

    postTeam(name, user1, user2, user3, user4) {
        let data = {name: name, user1: user1, user2: user2, user3: user3, user4: user4};

        return this.http.post('/api/createTeam', JSON.stringify(data), {headers: new HttpHeaders({'Content-type': 'application/json'})});
    }

    getTeams() {
        return this.http.get('/api/teams');
    }

    sendMessage(message) {
        let data = {key: this.id, message: message};

        return this.http.post('/api/writeMessage', data, {headers: new HttpHeaders({'Content-type': 'application/json'})});
    }

    getMessages() {
        let data = {key:this.id};

        return this.http.post('/api/messages', data, {headers: new HttpHeaders({'Content-type': 'application/json'})});
    }
}