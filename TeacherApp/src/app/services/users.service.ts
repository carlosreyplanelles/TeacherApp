import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:3000/users'
  apiUrl: string = 'http://localhost:3000/api/users';

  constructor(private httpClient: HttpClient) { }
  findByEmail(email: String): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${email}`)
    );
  }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.apiUrl}`));
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.apiUrl}/user=${pId}`));
  }

  getByEmail(pEmail: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.apiUrl}/email=${pEmail}`));
  }
}