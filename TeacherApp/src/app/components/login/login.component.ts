import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Users } from 'src/app/interfaces/users.interface';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { StudentsService } from 'src/app/services/students.service';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { Student } from 'src/app/interfaces/student.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRole!: string;
  userId!: number;

  teacherData: Teacher | any;
  studentData: Student | any;

  constructor(
    private loginAuthService: LoginAuthService,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private router: Router
    ) { }

  user: Users = {
    email: "",
    password: "",
  }

  ngOnInit(): void {
  }

  //LOGIN

  async login(): Promise<void> {

    try {
      
      let response = await this.loginAuthService.login(this.user);
      
      if (response.success) {
        localStorage.setItem('user-token', response.token);
        this.userRole = this.loginAuthService.getRole();
        this.userId = this.loginAuthService.getId();

        // Obtiene los datos del usuario logeado para comprobar su estado
        if (this.userRole === 'teacher') {
          try {
            this.teacherData = await this.teachersService.getById(this.userId);
          }
          catch (exception: any) {
              console.log("error getTeacherById", exception);
          }
        }

        if (this.userRole === 'student') {
          try {
            this.studentData = await this.studentsService.getById(this.userId);
          } catch (err: any) {
            console.log(err);
          }
        }

        // Comprueba si no está validado (profesor) o inactivo (estudiante)
        if (this.userRole === 'teacher' && this.teacherData.validated === 0) {
          Swal.fire({
            icon: 'error',
            text: 'El usuario está a la espera de ser validado'
          })
          this.loginAuthService.logout();
        } else if (this.userRole === 'student' && this.studentData.active === 0) {
          Swal.fire({
            icon: 'error',
            text: 'El usuario no está activo'
          })
          this.loginAuthService.logout();
        } else {
          this.loginAuthService.loggedIn();
          this.router.navigate(['/perfil']);
        }
      } 
      else {
        Swal.fire({
          icon: 'error',
          text: response.error
        })
      }
  
    }
    catch (error: any) {
      const msgError= (error.status !== 400 ? ", inténtelo de nuevo más tarde" : ", revise los datos introducidos ")
      Swal.fire({
        icon: 'error',
        title: '\'' + error.status + ' -' + error.statusText + '\' Error al acceder a TeacherApp',
        html: `<div style="text-align: left;">
        <p>Ha ocurrido un error${msgError}</p>
        <p>Detalles: ${error.error['error']}</p>
      </div>`

      })
    }
  }
}
