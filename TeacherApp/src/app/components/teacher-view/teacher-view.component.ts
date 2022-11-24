import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  token: string | null = localStorage.getItem('user-token');
  tokenInfo: any;
  teacherId!: number;
  
  constructor(
    private teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.token) {
      this.tokenInfo = this.getDecodedAccessToken(this.token);
      this.teacherId = this.tokenInfo.user_id;
    }
  }

  ngOnInit(): void {
    console.log(this.teacherId);

    this.activatedRoute.params.subscribe(async (params: any) => {
      //Recupero el parámetro de la url
      //this.teacherId = parseInt(params['teacherId']);

      console.log("teacherId" , this.teacherId);

      try {
            //Petición a la API para traer los datos del profesor
            const result = await this.teachersService.getById(this.teacherId);
            
            console.log("result getTeacherById API ", result);  //result.name
      }
      catch (error) {
          console.log("error getTeacherById",error);
      }


    });
  }

  logout() {
    localStorage.removeItem('user-token');
    this.router.navigate(['/login']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
