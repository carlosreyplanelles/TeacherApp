import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';

@Injectable({
  providedIn: 'root'
})

export class TeachersService {

  baseUrl = 'http://localhost:3000/api/teachers/';

  baseUrlClasses = 'http://localhost:3000/api/teacher-classes/'; 

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}`)
    );
  }

  getById(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}${teacherId}`)
    );
  }

  create(teacher: Teacher): Promise<Teacher> {
    return lastValueFrom(this.httpClient.post<Teacher>(this.baseUrl, teacher));
  }

  delete(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}${teacherId}`)
    );
  }

  update(teacher: Teacher): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}${teacher.user_id}`, teacher)
    );
  }

  getClassesByTeacherId(teacherId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlClasses}${teacherId}`));
  }
}
