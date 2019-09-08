import { Component, OnInit, Input } from '@angular/core';
import { teamsService } from '../services/teams.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name;
  messages;
  nums;
  indexes;

  constructor(private req: teamsService) {
    this.name = this.req.name;
    this.messages = this.req.messages;
    this.nums = [];

    for(let i=0; i<this.messages.length; i++) {
      this.nums.push(i);
    }
  }

  ngOnInit() {
  }

}
