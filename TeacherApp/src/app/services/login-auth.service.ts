import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(
    private httpClient: HttpClient,
    ) { }


  //LOGIN

  private baseURL: string = "http://localhost:3000"

  login(loginUser:Users) {
    return this.httpClient.post(`${this.baseURL}/users/login`, loginUser)
  }
}
