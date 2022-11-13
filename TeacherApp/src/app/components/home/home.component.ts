import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

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

  studentid: number = 101;
  currentStudent!: Student | any;
  currentTeacher!: Teacher | any;


  constructor(
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any) => {
      //   let studentid: number = parseInt(params.adminid)
      //   this.currentStudent = await this.adminService.getAdminById(params.id);
      let response = await this.studentsService.getById(this.studentid);
      console.log(response);
      this.currentStudent = response;
    })

    /* SI ACEPTA UTILIZAR SU UBICACION */
    /* Getting the current position of the user */
    navigator.geolocation.getCurrentPosition(position => {
      this.userlat = position.coords.latitude;
      this.userlong = position.coords.longitude
    })
    /* COGER COORDENADAS DE LA BASE DE DATOS DEL USUARIO */
    console.log(this.currentStudent);

  }

}
