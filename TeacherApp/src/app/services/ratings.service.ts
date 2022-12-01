import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginAuthService } from './login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  baseUrl = 'http://localhost:3000/api/ratings/';

  constructor(
    private httpClient: HttpClient,
    private loginAuthService: LoginAuthService
    ) { }

  getByTeacherAndStudent(teacherId: number, studentId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?teacherid=${teacherId}&studentid=${studentId}`, this.loginAuthService.getTokenHeader()));
  }

  create(rating: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, rating, this.loginAuthService.getTokenHeader()));
  }

  update(rating: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${rating.id}`, rating, this.loginAuthService.getTokenHeader()));
  }
}
