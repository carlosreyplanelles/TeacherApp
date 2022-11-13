import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor
(
  private loginAuthService: LoginAuthService,
  private router: Router
) {}

  canActivate():boolean{

    if(!this.loginAuthService.isAuth()){
      console.log("no valido")
      this.router.navigate(['home'])
      return false
    }
    return true;
  } 
}
