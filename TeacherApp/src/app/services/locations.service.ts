import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Location } from '../interfaces/location.interface'

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  baseUrl: string = 'http://localhost:3000/locations';
  constructor(private httpClient: HttpClient) { }
  getAllProvince(){
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/provinces`))
  }

  getCitiesByProvince(province_id: string){
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/provinces/cities/${province_id}`))
  }
  getAllCities(){
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/cities`))
  }

  create(newLocation:Location){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return lastValueFrom(this.httpClient.post<Location>(this.baseUrl, newLocation, httpOptions ))
  }
}
