import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';


@Injectable({
  providedIn: 'root'
})


export class AdminsService {

  baseUrl: string = 'https://localhost:300/api/admin/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admin/admin=${pId}`));
  }

  createAdmin(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/new`));
  }

  updateAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/update/admin=${pId}`));
  }

  validateTeacherById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/validate/teacher=${pId}`));
  }

  deleteAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/delete/admin=${pId}`));
  }

  deleteaAllAdmin(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/delete/all`));
  }

}
