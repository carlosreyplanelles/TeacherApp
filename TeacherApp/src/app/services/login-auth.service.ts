import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(private httpClient: HttpClient) { }

  private baseURL: string = "http://localhost:3000"

  login(user:any) {
    return this.httpClient.post(`${this.baseURL}/users/signin`, user)
  }
}
