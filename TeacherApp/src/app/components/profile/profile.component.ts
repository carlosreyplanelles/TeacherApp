import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token: string | null;
  tokenInfo: any;
  userRole!: string;

  constructor() {
    this.token = localStorage.getItem('user-token');
    if (this.token) {
      this.tokenInfo = this.getDecodedAccessToken(this.token);
      this.userRole = this.tokenInfo.user_role;
    }
  }

  ngOnInit(): void {
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
