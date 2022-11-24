import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  
  baseUrl = 'http://localhost:3000/api/students/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}`)
    );
  }

  getById(studentId: number | null): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}${studentId}`)
    );
  }

  create(student: Student): Promise<Student> {
    return lastValueFrom(this.httpClient.post<Student>(this.baseUrl, student));
  }

  delete(studenId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}${studenId}`)
    );
  }

  update(student: Student): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}${student.id}`, student)
    );
  }
}
