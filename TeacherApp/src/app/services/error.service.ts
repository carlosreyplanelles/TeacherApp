import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private baseUrl:string ="http://lolcalhost:3000/api/errors"
  constructor(private httpClient:HttpClient) { }

  
}
