import { Component, Input, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-classes-list',
  templateUrl: './teacher-classes-list.component.html',
  styleUrls: ['./teacher-classes-list.component.css']
})
export class TeacherClassesListComponent implements OnInit {

  
  @Input() teacherId!: number;

  studentsClasses: any[] = [];

  constructor(private teachersService: TeachersService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.studentsClasses = await this.teachersService.getClassesByTeacherId(this.teacherId);
    } 
    catch (err) {
      console.log(err);
    }
  }
}
