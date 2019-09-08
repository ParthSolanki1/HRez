import { Component, OnInit } from '@angular/core';
import { teamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor(private req: teamsService, private router: Router) { }

  ngOnInit() {
    this.req.getMessages().subscribe(resp => {
      this.req.messages = (resp as any).messages.reverse();
      this.router.navigate(['dashboard/team']);
    });
  }

}
