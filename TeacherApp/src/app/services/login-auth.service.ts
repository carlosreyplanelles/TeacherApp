import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
    ) { }

  private baseURL: string = "http://localhost:3000"

  login(user:any) {
    return this.httpClient.post(`${this.baseURL}/users/signin`, user)
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token')!
    if(this.jwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')){
      return false
    } else {
      return true
    }
  }
}
