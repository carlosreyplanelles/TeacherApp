import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { Admin } from 'src/app/interfaces/admin.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { AdminsService } from 'src/app/services/admins.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';


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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.token) {
      this.tokenInfo = this.getDecodedAccessToken(this.token);
      this.adminId = this.tokenInfo.user_id;
    }
  }

  ngOnInit(): void {
    console.log(this.adminId);

    this.activatedRoute.params.subscribe(async (params: any) => {
      //   let adminid: number = parseInt(params.adminid)
      //   let resAdmin = await this.adminService.getAdminById(206);
      //   this.currentAdmin = resAdmin;

      this.userService.getById(this.adminId)
        .then(response => {
          this.currentUser = response;
        })
        .catch(error => {
          console.log('ERROR', error)
        })

      this.numStudents = await this.getNumStudents();
      this.numTeachers = await this.getNumTeachers();
      // getNumInactives();
      // getNumPending();
    })
  }

  async getNumStudents(): Promise<number> {
    let response = await this.studentsService.getAll();
    return response.length;
  }

  getNumInactives() {

  }

  async getNumTeachers(): Promise<number> {
    let response = await this.teachersService.getAll();
    console.log(response);
    return response.length;
  }

  getNumPending() {

  }

  chargeTab(tab: string): void {
    this.actualTab = tab;
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
