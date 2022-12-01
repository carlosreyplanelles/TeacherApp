import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userlat: number = 0;
  userlong: number = 0;

  currentUser!: User | Student | Teacher | any;
  arrTeachers!: Teacher | any;


  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    /* SI ESTA LOGEADO RECUPERAMOS EL USUARIO POR RUTA */
    this.activatedRoute.params.subscribe(async (params: any) => {
      //   let studentid: number = parseInt(params.adminid)
      //   this.currentUser = await this.usersService.getById(params.id);
      let response = await this.usersService.getById(101);
      this.currentUser = response;
      console.log(this.currentUser);
    })

    /* POSICIONAR USUARIO LOGEADO */
    this.setCurrentLocation();

    /* AÑADIR PROFESORES EN EL MAPA */
    this.getAllTeachers();

    /* BUSQUEDA DE UBICACION */


  }

  async setCurrentLocation() {
    /* SI ACEPTA UTILIZAR SU UBICACION */
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.userlat = position.coords.latitude;
        this.userlong = position.coords.longitude;

        /* GUARDAR UBICACION BBDD */
        let newLocation = {
          role: this.currentUser.title,
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        let response = await this.usersService.saveLocation(this.currentUser, newLocation);
      })
      /* SINO COGER COORDENADAS DE LA BASE DE DATOS DEL ESTUDIANTE */
    } else {
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

}
