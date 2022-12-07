import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Student } from 'src/app/interfaces/student.interface';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-public-view',
  templateUrl: './student-public-view.component.html',
  styleUrls: ['./student-public-view.component.css']
})
export class StudentPublicViewComponent implements OnInit {

  studentId!: number;
  currentStudent: Student | any;

  constructor(
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
    this.studentId = parseInt(params.studentId);

    try {
      //Petición a la API para traer los datos del estudiante
      this.currentStudent = await this.studentsService.getById(this.studentId);
    } catch (exception: any) {
      console.log("error getStudentById", exception);
      // alert('Error ' + exception.status +' - ' + exception.statusText + ": " + exception.error.error);
    }
    });
  }

}
