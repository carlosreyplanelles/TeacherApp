import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  baseUrl = 'http://localhost:3000/api/ratings/';

  constructor(private httpClient: HttpClient) { }

  getByTeacherAndStudent(teacherId: number, studentId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?teacherid=${teacherId}&studentid=${studentId}`));
  }

  create(rating: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, rating));
  }

  update(rating: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${rating.id}`, rating));
  }
}
