import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginAuthService } from './login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrlStudent = 'http://localhost:3000/api/student-classes/';

  constructor(
    private httpClient: HttpClient,
    private loginAuthService: LoginAuthService
    ) {}

  getByStudent(studentId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlStudent}${studentId}`, this.loginAuthService.getTokenHeader()));
  }
}
