import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginAuthService: LoginAuthService
    ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let token: string | null = localStorage.getItem('user-token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
      const userRole = this.loginAuthService.getRole();

      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        alert('No tienes permiso para ver esta página');
        return false;
      }
      return true;
    }
  }
}
