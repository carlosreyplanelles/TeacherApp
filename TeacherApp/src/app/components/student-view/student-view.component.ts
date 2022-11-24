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

  userData: any = localStorage.getItem('user-data');
  user: any = JSON.parse(this.userData);

  constructor(private studentsService: StudentsService) {  }

  async ngOnInit(): Promise<void> {
    try {
      this.currentStudent = await this.studentsService.getById(this.user.id);
    } catch (err) {
      console.log(err);
    }
  }

}
