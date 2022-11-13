import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  /* A variable that is going to be used to make the request to the API. */
  baseUrl: string = 'http://localhost:3000/api/students';

  constructor(private httpClient: HttpClient) { }


  /**
   * Get all students.
   */
  getAllStudents(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

}
