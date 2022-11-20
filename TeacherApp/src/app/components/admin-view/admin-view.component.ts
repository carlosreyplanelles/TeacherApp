import { Component, OnInit } from '@angular/core';
//import { Admin } from 'src/app/interfaces/admin.interface';
//import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

 // arrAdmins: Admin[] = [];
  numStudents: Number = 0;
  numTeachers: Number = 0;
  numValidated: Number = 0;
  numPending: Number = 0;


  constructor() { }  //private adminService: AdminsService

  ngOnInit(): void {

  }

}
