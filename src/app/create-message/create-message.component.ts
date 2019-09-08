import { Component, OnInit, OnChanges} from '@angular/core';
import { teamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  message;
  characters;

  constructor(private req: teamsService, private router:Router) { }

  ngOnInit() {
    this.characters = 500;
  }

  ngOnChanges() {
  }

  onSubmit() {
    this.req.sendMessage(this.message).subscribe(data => {
      alert('Message Sent!');
    });
  }

  onClick(){
    this.req.getMessages().subscribe(resp => {
      this.req.messages = (resp as any).messages.reverse();
      this.router.navigate(['dashboard/team']);
    });
  }

}
