import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';
import { LoginAuthService } from './login-auth.service';


@Injectable({
  providedIn: 'root'
})


export class AdminsService {

  baseUrl: string = 'http://localhost:3000/api/admin';

  constructor(
    private httpClient: HttpClient,
    private loginAuthService: LoginAuthService
    ) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, this.loginAuthService.getTokenHeader()));
  }

  getAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admin=${pId}`, this.loginAuthService.getTokenHeader()));
  }

  createAdmin(pAdmin: Admin): Promise<any> {
    return lastValueFrom(this.httpClient.post<Admin>(`${this.baseUrl}/new`, pAdmin, this.loginAuthService.getTokenHeader()));
  }

  updateAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/update/admin=${pId}`, this.loginAuthService.getTokenHeader()));
  }

  validateTeacherById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/validate/teacher=${pId}`, this.loginAuthService.getTokenHeader()));
  }

  deleteAdminById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/admin=${pId}`, this.loginAuthService.getTokenHeader()));
  }

  deleteaAllAdmin(): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/all`, this.loginAuthService.getTokenHeader()));
  }

}
