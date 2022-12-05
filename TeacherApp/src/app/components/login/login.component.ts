import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    let response = await this.loginAuthService.login(this.user);

    // console.log(response);

    // const tokenInfo = this.loginAuthService.getDecodedAccessToken(response.token);
    // console.log(tokenInfo);

    if (response.success) {
      localStorage.setItem('user-token', response.token);
      this.loginAuthService.loggedIn();

      this.router.navigate(['/perfil']);
    } else {
      alert(response.error);
    }
  }
}
