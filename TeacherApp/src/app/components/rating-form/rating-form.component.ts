import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  // Este dato se obtendrá de la sesión activa
  studentId: number = 108;

  constructor() { }

  ngOnInit(): void {
  }

}
