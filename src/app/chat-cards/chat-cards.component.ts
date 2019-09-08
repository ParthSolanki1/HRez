import { Component, OnInit, Input } from '@angular/core';
import { teamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-cards',
  templateUrl: './chat-cards.component.html',
  styleUrls: ['./chat-cards.component.scss']
})
export class ChatCardsComponent implements OnInit {

  @Input() number;
  name;
  members;
  users;
  team;

  constructor(private req: teamsService, private router: Router) {} 

  ngOnInit() {
    this.team = this.req.teams[this.number];
    this.name = this.team.name;
    this.users = []

    if(typeof this.team.user1 === "string"){
      this.users.push(this.team.user1);
    }
    if(typeof this.team.user2 === "string"){
      this.users.push(this.team.user2);
    }
    if(typeof this.team.user3 === "string"){
      this.users.push(this.team.user3);
    } 
    if(typeof this.team.user4 === "string"){
      this.users.push(this.team.user4);
    }
    if(typeof this.team.user5 === "string"){
      this.users.push(this.team.user5);
    }

    this.members = "Members: "

    for(let i = 0; i<this.users.length; i++) {
      this.members = this.members + this.users[i] + ", "
    }
  }

  onJoin() {
    this.req.id = this.team.key;
    this.req.name = this.team.name;

    this.req.getMessages().subscribe(resp => {
      this.req.messages = (resp as any).messages.reverse();
      this.router.navigate(['dashboard/team']);
    });
  }

}
