import { Component, Input, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-student-classes-list',
  templateUrl: './student-classes-list.component.html',
  styleUrls: ['./student-classes-list.component.css']
})
export class StudentClassesListComponent implements OnInit {

  @Input() studentId!: number;

  activeClasses: any[] = [];

  constructor(private classesService: ClassesService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.activeClasses = await this.classesService.getByStudent(this.studentId);
      console.log(this.activeClasses);      
    } catch (err) {
      console.log(err);
    }
  }

}
