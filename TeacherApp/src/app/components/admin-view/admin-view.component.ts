import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from 'src/app/interfaces/admin.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { AdminsService } from 'src/app/services/admins.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { LoginAuthService } from 'src/app/services/login-auth.service';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  currentUser!: Admin | User | any;

  numStudents: number = 0;
  numInactives: number = 0;
  numTeachers: number = 0;
  numPending: number = 0;

  actualTab: string = 'pending';

  token: string | null = localStorage.getItem('user-token');
  tokenInfo: any;
  adminId!: number;

  constructor(
    private userService: UsersService,
    private adminService: AdminsService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {
    if (this.token) {
      this.tokenInfo = this.loginAuthService.getDecodedAccessToken(this.token);
      this.adminId = this.tokenInfo.user_id;
    }
  }

  async ngOnInit(): Promise<void> {
    this.userService.getById(this.adminId)
      .then(response => {
        this.currentUser = response;
        // console.log(this.currentUser);
      })
      .catch(error => {
        console.log('ERROR', error)
      })

    try {
      this.numStudents = await this.getNumStudents();
      this.numTeachers = await this.getNumTeachers();
    } catch (err) {
      alert(err);
    }
    // getNumInactives();
    // getNumPending();

    // console.log(this.currentUser);

  }

  async getNumStudents(): Promise<number> {
    let response = await this.studentsService.getAll();
    return response.length;
  }

  getNumInactives() {

  }

  async getNumTeachers(): Promise<number> {
    let response = await this.teachersService.getAllTeachers();
    console.log(response);
    return response.length;
  }

  getNumPending() {

  }

  chargeTab(tab: string): void {
    this.actualTab = tab;
  }

  logout() {
    this.loginAuthService.logout();
    this.router.navigate(['/login']);
  }
}
