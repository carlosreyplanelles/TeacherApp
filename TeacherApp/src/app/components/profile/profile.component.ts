import { Component, OnInit } from '@angular/core';

import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userRole!: string;

  constructor(private loginAuthService: LoginAuthService) {
    this.userRole = this.loginAuthService.getRole();
  }

  ngOnInit(): void {
  }
}
