import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { authenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(public auth: authenticationService, public router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(!this.auth.loggedin){
        this.router.navigate(['']);
      }

      return this.auth.loggedin;
    }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildren implements CanActivateChild{
  
  constructor(public auth: authenticationService, public router:Router){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(!this.auth.loggedin){
        this.router.navigate(['']);
      }

      return this.auth.loggedin;
    }

}
