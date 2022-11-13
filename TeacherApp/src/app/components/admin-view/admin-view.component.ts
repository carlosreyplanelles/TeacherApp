import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin.interface';
import { AdminsService } from 'src/app/services/admins.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  arrAdmins: Admin[] = [];
  currentAdmin!: Admin | any;

  numStudents: number = 0;
  // arrStudents: Student[] = [];
  numTeachers: number = 0;
  // arrTeachers: Teacher[] = [];
  numValidated: number = 0;
  // arrValidated: Teacher[] = [];
  numPending: number = 0;
  // arrPending: Teacher[] = [];

  adminid: number = 205;

  constructor(
    private adminService: AdminsService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      //   let adminid: number = parseInt(params.adminid)
      //   let resAdmin = await this.adminService.getAdminById(206);
      //   this.currentAdmin = resAdmin;

      this.adminService.getAdminById(205)
        .then(response => {
          this.currentAdmin = response;
          console.log(this.currentAdmin);
        })
        .catch(error => {
          console.log('ERROR', error)
        })

      this.numStudents = await this.getNumStudents();
      // getNumTeachers();
      // getNumValidated();
      // getNumPending();
    })
  }

  async getNumStudents(): Promise<number> {
    let response = await this.studentsService.getAllStudents();
    return response.length;
  }

  getNumTeachers() {

  }

  getNumValidated() {

  }

  getNumPending() {

  }

}
