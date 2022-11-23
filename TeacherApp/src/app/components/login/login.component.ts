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

  login() {
    const token: any = localStorage.getItem('token')!

    this.loginAuthService.login(this.user).subscribe( (res:any) => {
      localStorage.setItem('token', res.token)
    })
    if(token){
      this.router.navigate(['/home'])
    }
  }
}
