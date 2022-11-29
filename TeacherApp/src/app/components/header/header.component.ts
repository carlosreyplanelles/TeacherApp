import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: boolean = false;

  constructor() {
    if (localStorage.getItem('user-token')) {
      this.loggedUser = true;
    }
  }

  ngOnInit(): void {
  }

}
