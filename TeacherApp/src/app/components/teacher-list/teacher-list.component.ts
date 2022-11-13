import { Component, OnInit } from '@angular/core';
// Delete
import { STUDENTS } from 'mokdata.students.db';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {
  
  arrTeachers: Teacher[] = [];
  constructor(private teachersService: TeachersService) {
    // Delete
    this.arrTeachers = STUDENTS;
  }

  ngOnInit(): void {
    // try {
    //   let response = await this.teachersService.getAll(1);
    //   this.arrTeachers = response.data;
    //   console.log(this.arrTeachers)
    // }
    // catch (err: any) {
    //   console.log(err.error)
    // }
  }
}
