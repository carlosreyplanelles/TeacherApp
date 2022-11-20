import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Teacher } from '../interfaces/teacher.interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  baseURL: string = "http://localhost:3100/api/teachers/";

  constructor(private httpClient: HttpClient) { }

  getById(teacherId: number): Promise<Teacher> {
    return lastValueFrom (this.httpClient.get<Teacher>(`${this.baseURL}${teacherId}`));
  }

}
