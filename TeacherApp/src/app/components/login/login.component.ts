import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  user = {
    email: "zmccaughanf@nytimes.com",
    password: "Spain"
  }

  ngOnInit(): void {
  }

  signin() {
    this.loginAuthService.login(this.user).subscribe( (res:any) => {
      localStorage.setItem('token', res)
    })
  }

  login() {
      this.router.navigate(['home'])
  }

}
