import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { Student } from 'src/app/interfaces/student.interface';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  currentStudent: Student | any;

  token: string | null = localStorage.getItem('user-token');
  tokenInfo: any;
  studentId!: number;

  constructor(
    private studentsService: StudentsService,
    private router: Router
    ) {
      if (this.token) {
        this.tokenInfo = this.getDecodedAccessToken(this.token);
        this.studentId = this.tokenInfo.user_id;
      }
    }

  async ngOnInit(): Promise<void> {
    console.log(this.studentId);

    try {
      this.currentStudent = await this.studentsService.getById(this.studentId);
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    localStorage.removeItem('user-token');
    this.router.navigate(['/login']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
