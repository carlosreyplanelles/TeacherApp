import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Users } from 'src/app/interfaces/users.interface';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginAuthService: LoginAuthService,
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
        this.loginAuthService.loggedIn();
  
        this.router.navigate(['/perfil']);
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
