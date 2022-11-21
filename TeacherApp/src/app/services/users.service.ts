import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = 'http://localhost:3000/api/users';

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/user=${pId}`));
  }

  getByEmail(pEmail: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/email=${pEmail}`));
  }


}
