import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


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
  userid!: number;

  constructor(
    private userService: UsersService,
    private adminService: AdminsService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {
    if (this.token) {
      this.tokenInfo = this.getDecodedAccessToken(this.token);
      this.userid = this.tokenInfo.user_id;
    }
  }

  async ngOnInit(): Promise<void> {

    try {
      let response = await this.userService.getById(this.userid);
      this.currentUser = response;
      console.log(this.currentUser);
    } catch (err: any) {
      alert(err.error.error);
    }

    this.numStudents = await this.getNumStudents();
    this.numInactives = await this.getNumInactives();
    this.numTeachers = await this.getNumTeachers();
    this.numPending = await this.getNumPending();

  }

  async getNumStudents(): Promise<number> {
    let response = await this.studentsService.getActiveStudent();
    return response.length;
  }

  async getNumInactives(): Promise<number> {
    let response = await this.studentsService.getInactiveStudent();
    return response.length;
  }

  async getNumTeachers(): Promise<number> {
    // let response = await this.teachersService.getActiveTeachers();
    let response = await this.teachersService.getAllTeachers();
    return response.length;
  }

  async getNumPending(): Promise<number> {
    let response = await this.teachersService.getPendingTeachers();
    console.log(response);
    return response.length;
  }

  chargeTab(tab: string): void {
    this.actualTab = tab;
  }

  logout() {
    this.loginAuthService.logout();
    this.router.navigate(['/login']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
