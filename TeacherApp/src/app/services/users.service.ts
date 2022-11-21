import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  findByEmail(email: String): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${email}`)
    );
  }
}
