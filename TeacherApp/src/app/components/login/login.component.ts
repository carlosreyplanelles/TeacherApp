import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users.interface';
import { LoginAuthService } from 'src/app/services/login-auth.service';

import jwt_decode from 'jwt-decode'

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
    let response = await this.loginAuthService.login(this.user);

    console.log(response);

    if (response.success) {
      localStorage.setItem('user-token', response.token);
      //localStorage.setItem('user-id', response.user_id);
      //localStorage.setItem('user-role', response.user_role);
      localStorage.setItem('user-data', JSON.stringify({
        id: Number(response.user_id),
        role: Number(response.user_role)
      }));

      // TODO: Se redirige a un perfil genérico, y con guardas de role (canLoad) se cargan o no los componentes
      //this.router.navigate(['/profile-teacher', response.user_id]);
    } else {
      alert(response.error);
    }
  }
}
