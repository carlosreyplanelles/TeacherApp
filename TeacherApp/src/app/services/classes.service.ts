import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Class } from '../interfaces/class.interface';
import { LoginAuthService } from './login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrlStudent = 'http://localhost:3000/api/student-classes/';
  baseUrlBooking = 'http://localhost:3000/api/booking/';

  constructor(
    private httpClient: HttpClient,
    private loginAuthService: LoginAuthService
    ) {}

  getByStudent(studentId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlStudent}${studentId}`, this.loginAuthService.getTokenHeader()));
  }

  create(classbooking: Class): Promise<Class> {
    return lastValueFrom(this.httpClient.post<Class>(`${this.baseUrlBooking}`, classbooking));
  }

  getBookedClassesByTeacherDate(teacherId: number, date: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlBooking}teacher/teacher=${teacherId}&date=${date}`, this.loginAuthService.getTokenHeader()));
  }

}
