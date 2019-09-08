import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {

  username;
  password;
  userExists;
  passwordIncorrect;
  verifyComplete;


  constructor(public auth: authenticationService, public router:Router) {
  }

  ngOnInit() {
    this.userExists = true;
    this.passwordIncorrect = false;
    this.verifyComplete = true;
  }

  onSubmit() {
    this.auth.loginAuth(this.username, this.password).subscribe(resp => {
      this.userExists = (resp.body as any).userExists;
      this.passwordIncorrect = (resp.body as any).passwordIncorrect;
      this.verifyComplete = (resp.body as any).verifyComplete;
      if(this.userExists && !this.passwordIncorrect && this.verifyComplete) {
        this.auth.loggedin = true;
        this.auth.firstName = (resp.body as any).firstName;
        this.auth.lastName = (resp.body as any).lastName;
        this.router.navigate(['dashboard']);
      }
    });
  }
}
