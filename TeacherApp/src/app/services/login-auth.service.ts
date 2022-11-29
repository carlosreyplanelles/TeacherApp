import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(
    private httpClient: HttpClient,
    ) { }


  //LOGIN

  private baseURL: string = "http://localhost:3000/users/login"

  login(loginUser: Users): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseURL, loginUser));
  }
}
