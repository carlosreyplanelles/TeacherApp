import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-public-view',
  templateUrl: './teacher-public-view.component.html',
  styleUrls: ['./teacher-public-view.component.css']
})
export class TeacherPublicViewComponent implements OnInit {

  teacherId!: number;
  currentTeacher: Teacher | any;

  constructor(
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
    this.teacherId = parseInt(params.teacherId);

    try {
      //Petición a la API para traer los datos del profesor
      this.currentTeacher = await this.teachersService.getById(this.teacherId);
    } catch (exception: any) {
        console.log("error getTeacherById", exception);
        alert('Error ' + exception.status +' - ' + exception.statusText + ": " + exception.error.error);
    }
    });
  }
}
