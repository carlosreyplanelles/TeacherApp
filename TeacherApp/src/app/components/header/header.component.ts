import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: boolean = false;

  constructor(private loginAuthService: LoginAuthService) {}

  ngOnInit(): void {
    this.loginAuthService.loginStatusChange().subscribe(isLogged => this.loggedUser = isLogged);
  }

}
