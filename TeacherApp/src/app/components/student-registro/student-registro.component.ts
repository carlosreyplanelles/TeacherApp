import { Component, OnInit } from '@angular/core';
import{ User } from 'src/app/interfaces/user.interface';
import{ Student } from 'src/app/interfaces/student.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/utilities/utils';

@Component({
  selector: 'app-student-registro',
  templateUrl: './student-registro.component.html',
  styleUrls: ['./student-registro.component.css']
})
export class StudentRegistroComponent implements OnInit {

  studentForm:FormGroup;
  constructor(private utils: Utils) { 
    this.studentForm  = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]')
      ]),
      surname: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z]')
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordConfirm: new FormControl('',[
        Validators.required,
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]'),
        Validators.maxLength(12),
        Validators.minLength(12)
      ]),
      avatar: new FormControl('',[]),
    }, []);
  }
  
  ngOnInit(): void {
  }

  getDataForm() {
    if(this.studentForm.status==="VALID"){
    let formValues = this.studentForm.value;
    console.log(formValues);
    let newUser = this.utils.createNewUser(formValues, 1);
    let newStudent = this.utils.createStudent(formValues, 1)
    }
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.studentForm.get(controlName)?.status==="INVALID" && this.studentForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

}
