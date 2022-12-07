import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { User } from 'src/app/interfaces/user.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userlat: number = 0;
  userlong: number = 0;
  exists: boolean = false;

  currentUser!: User | Student | Teacher | any;
  arrTeachers!: Teacher | any;

  token: string | null = localStorage.getItem('user-token');
  tokenInfo: any;
  userid!: number;


  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private loginAuthService: LoginAuthService,
    private router: Router) {

    this.userid = this.loginAuthService.getId();

  }

  async ngOnInit(): Promise<void> {
    /* SI ESTA LOGEADO RECUPERAMOS EL USUARIO */
    if (this.userid !== undefined) {
      let response = await this.usersService.getById(this.userid);
      this.currentUser = response;
    }

    /* POSICIONAR USUARIO LOGEADO */
    await this.setCurrentLocation();

    /* AÑADIR PROFESORES EN EL MAPA */
    await this.getAllTeachers();

    /* BUSQUEDA DE UBICACION */
    const input = document.getElementById('autocomplete');

    // const autocomplete = new google.maps.places.Autocomplete(input, {
    //   types: ['establisment'],
    //   fields: ['places_id', 'geometry', 'name']
    // });

    // autocomplete.addListener('place_changed', onPlaceChanged);

  }

  async setCurrentLocation() {
    /* SI ACEPTA UTILIZAR SU UBICACION */
    console.log(navigator.geolocation);
    if ('geolocation' in navigator) {
      await navigator.geolocation.getCurrentPosition(async (position) => {
        this.exists = true;

        this.userlat = position.coords.latitude;
        this.userlong = position.coords.longitude;

        /* GUARDAR UBICACION BBDD SI ESTA LOGEADO */
        if (this.currentUser !== undefined) {
          let newLocation = {
            role: this.currentUser.title,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          console.log(this.currentUser);
          let response = await this.usersService.saveLocation(this.currentUser, newLocation);
        }
      })
      /* SI ESTA LOGEADO Y SIN PERMISO DE UBICACION, RECUPERAR DE LA BASE DE DATOS */
    } else if (this.currentUser !== undefined) {
      this.getGeoUser(this.currentUser.id);
    }
  }

  async getGeoUser(userid: number) {
    let geoUser;
    if (this.currentUser.role_id === 3) {
      geoUser = await this.studentsService.getById(userid);
    } else if (this.currentUser.role_id === 2) {
      geoUser = await this.teachersService.getById(userid);
    }
    this.userlat = geoUser.latitude;
    this.userlong = geoUser.longitude;
  }

  async getAllTeachers() {
    this.arrTeachers = await this.teachersService.getAllTeachers();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
