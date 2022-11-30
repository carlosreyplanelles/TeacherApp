import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(
    private httpClient: HttpClient,
    ) { }

  private baseURL: string = "http://localhost:3000/users/login"

  login(loginUser: Users): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseURL, loginUser));
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user-token');
  }
}
