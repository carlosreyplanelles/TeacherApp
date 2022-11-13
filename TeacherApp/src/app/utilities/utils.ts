import { Injectable } from '@angular/core';
import {User} from 'src/app/interfaces/user.interface';
import { Student } from '../interfaces/student.interface';

@Injectable({
    providedIn: 'root'
  })
  export class Utils {
    createNewUser(formValues:any, role_id: number): User {
        const newUser = { 
            name: formValues.name,
            surname: formValues.surname,
            email: formValues.email,
            password: formValues.password,
            role_id: role_id,
        }
        return newUser
    }

    createStudent(formValues:any, user_id:number): Student{
        const newStudent = {
            phone: formValues.phone,
            avatar:formValues.avatar,
            user_id:user_id
        }
        return newStudent;
    }
  }
