import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';
import { LoginAuthService } from './login-auth.service';

@Injectable({
  providedIn: 'root'
})

export class TeachersService {

  baseUrl = 'http://localhost:3000/api/teachers/';

  baseUrlClasses = 'http://localhost:3000/api/teacher-classes/'; 

  constructor(
    private httpClient: HttpClient,
    private loginAuthService: LoginAuthService
  ) { }

  getAllTeachers(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}`, this.loginAuthService.getTokenHeader())
    );
  }

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}`, this.loginAuthService.getTokenHeader())
    );
  }

  getById(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}${teacherId}`, this.loginAuthService.getTokenHeader())
    );
  }

  create(teacher: Teacher): Promise<Teacher> {
    return lastValueFrom(
      this.httpClient.post<Teacher>(`${this.baseUrl}`, teacher)
    );
  }

  delete(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}${teacherId}`, this.loginAuthService.getTokenHeader())
    );
  }

  update(teacher: Teacher): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}${teacher.teacher_id}`, teacher, this.loginAuthService.getTokenHeader())
    );
  }

  getClassesByTeacherId(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrlClasses}${teacherId}`, this.loginAuthService.getTokenHeader())
    );
  }

  getActiveTeachers(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}active`, this.loginAuthService.getTokenHeader())
    );
  }

  getPendingTeachers(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}pending`, this.loginAuthService.getTokenHeader())
    );
  }

  getTeacherHours(teacherId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}hours/${teacherId}`, this.loginAuthService.getTokenHeader()));
  }
 
  validateTeacher(teacherId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}validate/${teacherId}`, this.loginAuthService.getTokenHeader())
    );
  }
}
