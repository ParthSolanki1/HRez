import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { teamsService } from '../services/teams.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = {firstName: this.auth.firstName, lastName: this.auth.lastName};

  constructor(private auth: authenticationService, private router: Router, private teams:teamsService) {

  }

  ngOnInit() {
  }

  onClick() {
    this.teams.getTeams().subscribe(data => {
      this.teams.teams = (data as any).allTeams;
      this.router.navigate(['dashboard/view'])
    });
  }
}
