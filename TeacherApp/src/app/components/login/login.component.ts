import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  user = {
    email: "felix@gmail.com",
    password: "123"
  }
  ngOnInit(): void {
  }

  login(){

  }

}
