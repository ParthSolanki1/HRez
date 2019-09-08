import { Component, OnInit, Input } from '@angular/core';
import { teamsService } from '../services/teams.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() number;
  name;
  message;

  constructor(private req: teamsService) {
  }

  ngOnInit() {
    this.name = this.req.messages[this.number].user;
    this.message = this.req.messages[this.number].message;
  }

}
