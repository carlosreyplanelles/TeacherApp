import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    let token: string | null = localStorage.getItem('user-token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
}
