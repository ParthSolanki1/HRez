import { Component, OnInit, Input } from '@angular/core';
import { authenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() show:boolean;

  constructor(private auth: authenticationService, private router: Router) {
    this.show = false;
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().subscribe(data => {
      this.router.navigate(['']);
      this.auth.loggedin = false;
      alert("Successfully Logged Out!");
    });
  }

}
