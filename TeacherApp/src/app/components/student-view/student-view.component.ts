import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from 'src/app/interfaces/student.interface';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  currentStudent: Student | any;

  token: string | null;
  tokenInfo: any;
  studentId!: number;

  constructor(
    private studentsService: StudentsService,
    private loginAuthService: LoginAuthService,
    private router: Router
    ) {
      this.token = localStorage.getItem('user-token');
      if (this.token) {
        this.tokenInfo = this.loginAuthService.getDecodedAccessToken(this.token);
        this.studentId = this.tokenInfo.user_id;
      }
    }

  async ngOnInit(): Promise<void> {
    try {
      this.currentStudent = await this.studentsService.getById(this.studentId);
    } catch (err: any) {
      console.log(err);
      alert(err.error.error);
    }
  }

  logout() {
    this.loginAuthService.logout();
    this.router.navigate(['/login']);
  }
}
