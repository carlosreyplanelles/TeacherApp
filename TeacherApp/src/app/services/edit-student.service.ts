import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditStudentService {

  constructor
  (
    private httpClient: HttpClient
  )
   { }


  baseURL = 'https://localhost:3000'


  getStudents() {
    return this.httpClient.get(`${this.baseURL}/users`)
  }


}
