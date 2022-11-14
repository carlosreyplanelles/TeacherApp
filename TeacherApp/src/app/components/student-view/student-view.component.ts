import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  currentStudent: Student | any;

  studentId: number = 200;

  constructor(private studentsService: StudentsService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.currentStudent = await this.studentsService.getById(this.studentId);
    } catch (err) {
      console.log(err);
    }
  }

}
