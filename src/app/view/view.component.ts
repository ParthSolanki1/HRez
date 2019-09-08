import { Component, OnInit } from '@angular/core';
import { teamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  teams;
  nums;

  constructor(private req: teamsService, private router:Router) { 
    this.teams = this.req.teams;
    this.nums = [];
    
    for(let i = 0; i<this.teams.length; i++){
      this.nums.push(i);
    }
  }

  ngOnInit() {
  }

}
