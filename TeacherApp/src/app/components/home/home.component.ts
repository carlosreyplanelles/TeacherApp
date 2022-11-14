import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userlat: number = 0;
  userlong: number = 0;
  user_marker: string = "#0d6efd";


  //COORDENADAS MADRID DE EJEMPLO PROFESOR
  lat: number = 40.4165;
  long: number = -3.70256;


  constructor() { }

  ngOnInit(): void {


    /* SI ACEPTA UTILIZAR SU UBICACION */
    /* Getting the current position of the user */
    navigator.geolocation.getCurrentPosition(position => {
      this.userlat = position.coords.latitude;
      this.userlong = position.coords.longitude
    })
    /* COGER COORDENADAS DE LA BASE DE DATOS DEL USUARIO */


  }

}
