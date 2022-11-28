import { Component, Input, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css'],
})
export class TeacherCardComponent implements OnInit {

  @Input() myTeacher!: Teacher | any;
  constructor(private teachersService: TeachersService) {}

  ngOnInit(): void {}
}
