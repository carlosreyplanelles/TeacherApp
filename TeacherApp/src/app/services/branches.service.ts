import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  baseUrl: string = 'http://localhost:3000/branches';
  
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/`))
  }
}
