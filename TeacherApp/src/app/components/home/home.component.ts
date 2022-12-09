import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  userid!: number;
  userRole!: string;

  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private loginAuthService: LoginAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userid = this.loginAuthService.getId();
    this.userRole = this.loginAuthService.getRole();
  }

  async ngOnInit(): Promise<void> {

    /* SI ESTA LOGEADO RECUPERAMOS EL USUARIO */
    if (this.userid !== undefined) {
      let response;

      switch (this.userRole) {
        case 'admin':
          response = await this.usersService.getById(this.userid);
          break;
        case 'teacher':
          response = await this.teachersService.getById(this.userid);
          break;
        case 'student':
          response = await this.studentsService.getById(this.userid);
          break;
      }

      this.currentUser = response;
    }

    /* POSICIONAR USUARIO LOGEADO */
    await this.setCurrentLocation();

    /* AÑADIR PROFESORES EN EL MAPA */
    await this.getAllTeachers();

  }

  async setCurrentLocation() {
    /* SI EL NAVEGADOR PUEDE ACCEDER A LA UBICACION DEL USUARIO */
    if ('geolocation' in navigator) {
      await navigator.geolocation.getCurrentPosition(async (position) => {
        this.exists = true;

        this.userlat = position.coords.latitude;
        this.userlong = position.coords.longitude;

        /* GUARDAR UBICACION BBDD SI ESTA LOGEADO */
        if (this.currentUser !== undefined) {
          let newLocation = {
            role: this.userRole,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          let response = await this.usersService.saveLocation(this.currentUser, newLocation);
        }
      })
    }

    /* SI ESTA LOGEADO, RECUPERAR DE LA BASE DE DATOS */
    if (this.currentUser !== undefined) {
      this.getGeoUser();
    }
  }

  async getGeoUser() {
    let geoUser;
    if (this.userRole === 'student') {
      geoUser = await this.studentsService.getById(this.userid);
    } else if (this.userRole === 'teacher') {
      geoUser = await this.teachersService.getById(this.userid);
    }

    if (this.userRole !== 'admin') {
      this.userlat = geoUser.latitude;
      this.userlong = geoUser.longitude;
    }
  }

  async getAllTeachers() {
    this.arrTeachers = await this.teachersService.getAllTeachers();
  }
}
