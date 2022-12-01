import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  teacherId!: number;
  
  teacherData: Teacher | any;  /**TODO: Para no usar any !  (repasar). Aparecen warnings sin any*/

  constructor(
    private teachersService: TeachersService,
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {
    this.teacherId = this.loginAuthService.getId();
  }

  async ngOnInit(): Promise<void> {
    console.log("teacherId" , this.teacherId);

    try {
          //Petición a la API para traer los datos del profesor
          this.teacherData = await this.teachersService.getById(this.teacherId);
          
          console.log("result getTeacherById API ",  this.teacherData);  //result.name
    }
    catch (exception: any) {
        console.log("error getTeacherById",exception);
        alert('Error ' + exception.status +' - ' + exception.statusText + ": " + exception.error.error);
    }
  }

  logout() {
    this.loginAuthService.logout();
    this.router.navigate(['/login']);
  }
}
