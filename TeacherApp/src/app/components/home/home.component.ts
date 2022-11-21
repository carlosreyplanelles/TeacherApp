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

    this.activatedRoute.params.subscribe(async (params: any) => {
      //   let studentid: number = parseInt(params.adminid)
      //   this.currentStudent = await this.studentsService.getById(params.id);
      let response = await this.usersService.getById(101);
      this.currentUser = response;
    })

    /* SI ACEPTA UTILIZAR SU UBICACION */
    navigator.geolocation.getCurrentPosition(position => {
      this.userlat = position.coords.latitude;
      this.userlong = position.coords.longitude
      /* GUARDAR UBICACION BBDD */
    })
    /* SINO COGER COORDENADAS DE LA BASE DE DATOS DEL ESTUDIANTE */


    /* AÑADIR PROFESORES EN EL MAPA */
    this.getAllTeachers();

  }

  async getAllTeachers() {
    this.arrTeachers = await this.studentsService.getAll();
    console.log(this.arrTeachers);
  }

}
