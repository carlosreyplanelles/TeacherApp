import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';


@Injectable({
  providedIn: 'root'
})


export class AdminsService {

  baseUrl: string = 'http://localhost:3000/api/admin';

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admin=${pId}`));
  }

  createAdmin(pAdmin: Admin): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      })
    }
    return lastValueFrom(this.httpClient.post<Admin>(`${this.baseUrl}/new`, pAdmin, httpOptions));
  }

  updateAdminById(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      })
    }
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/update/admin=${pId}`, httpOptions));
  }

  validateTeacherById(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      })
    }
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/validate/teacher=${pId}`, httpOptions));
  }

  deleteAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/admin=${pId}`));
  }

  deleteaAllAdmin(): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/all`));
  }

}
