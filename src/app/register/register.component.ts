import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName;
  lastName;
  username;
  email;
  password;
  password2;
  usernameError;
  emailError;
  passwordError;
  firstNameError;
  lastNameError;
  password2Error;
  EmptyError;
  PassordNotMatchingError;
  UsernameUsedError;
  EmailUsedError;
  UsernameUsedErrorText;
  EmailUsedErrorText;
  PassordNotMatchingErrorText;
  fields;
  errors;
  passwordLengthError;
  atChecker;


  constructor(public auth: authenticationService) {
    this.firstNameError = false;
    this.lastNameError = false;
    this.usernameError = false;
    this.UsernameUsedError = false;
    this.emailError = false;
    this.EmailUsedError = false;
    this.passwordError = false;
    this.password2Error = false;
    this.PassordNotMatchingError = false;
    this.passwordLengthError = false;
    this.atChecker = false;

    this.EmptyError = "Cannot leave field empty";
    this.PassordNotMatchingErrorText = "Passwords do not match";
    this.UsernameUsedErrorText = "Username is already in use";
    this.EmailUsedErrorText = "Email is already in use";
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.UsernameUsedError = false;
    this.EmailUsedError = false;
    this.firstNameError = false;
    this.lastNameError = false;
    this.usernameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.password2Error = false;
    this.PassordNotMatchingError = false;
    this.passwordLengthError = false;
    this.atChecker = false;
    
    if(typeof this.firstName === 'undefined' || this.firstName === ""){
      this.firstNameError = true;
    }

    if (typeof this.lastName === 'undefined' || this.lastName === "") {
      this.lastNameError = true;
    }

    if (typeof this.username === 'undefined' || this.username === "") {
      this.usernameError = true;
    }

    if (typeof this.email === 'undefined' || this.email === "") {
      this.emailError = true;
    }
    if (typeof this.password === 'undefined' || this.password === "") {
      this.passwordError = true;
    } 

    if (typeof this.password2 === 'undefined' || this.password2 === "") {
      this.password2Error = true;
    }

    if (this.passwordError === false && this.password2Error === false && this.password !== this.password2) {
      this.PassordNotMatchingError = true;
    } else if (this.passwordError === false && this.password2Error === false && this.password.length < 8) {
      this.passwordLengthError = true
    }

    for(let i = 0; i<this.email.length; i++){
      if(this.email[i] === '@'){
        this.atChecker = true;
      }
    }

    this.atChecker = !this.atChecker;

    if(!this.firstNameError && !this.lastNameError && !this.usernameError && !this.emailError && !this.passwordError && !this.password2Error && !this.PassordNotMatchingError && !this.passwordLengthError && !this.atChecker){
      this.auth.registrationAuth(this.username, this.password, this.firstName, this.lastName, this.email).subscribe(resp => {
          this.UsernameUsedError = (resp.body as any).userExists;
          console.log(this.UsernameUsedError)
          this.EmailUsedError = (resp.body as any).emailExists;
          console.log(this.EmailUsedError)

          if(!this.UsernameUsedError && !this.EmailUsedError){
            alert("Registration Complete! Verify email to log in.")
          }
      });
    }
  }

}
