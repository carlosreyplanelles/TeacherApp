import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { RatingsService } from 'src/app/services/ratings.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  studentId!: number;

  ratingForm: FormGroup;
  currentRating: any;
  teacherId!: number;
  currentTeacher: Teacher | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ratingsService: RatingsService,
    private teachersService: TeachersService,
    private loginAuthService: LoginAuthService,
    private router: Router
  ) {
    this.ratingForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      comment: new FormControl('', [])
    });

    this.studentId = this.loginAuthService.getId();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.teacherId = parseInt(params.teacherId);

      try {
        //Petición a la API para traer los datos del profesor
        this.currentTeacher = await this.teachersService.getById(this.teacherId);
      } catch (exception: any) {
          console.log("error getTeacherById", exception);
          alert('Error ' + exception.status +' - ' + exception.statusText + ": " + exception.error.error);
      }

      // Check if there is a previous rating to show
      try {
        const response = await this.ratingsService.getByTeacherAndStudent(this.teacherId, this.studentId);
        
        if (response !== null) {
          this.currentRating = response;

          // Show the rating data
          this.ratingForm = new FormGroup({
            rating: new FormControl(this.currentRating?.rating, [Validators.required]),
            comment: new FormControl(this.currentRating?.comment, []),
            id: new FormControl(this.currentRating?.id, [])
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async getRating() {
    if (this.ratingForm.valid) {
      const newRating: any = this.ratingForm.value;
      newRating.teacher_id = this.teacherId;
      newRating.student_id = this.studentId;

      if (newRating.id) {
        // UPDATE
        const response = await this.ratingsService.update(newRating);
        // TODO: Gestionar respuesta si hay error
        
      } else {
        //CREATE
        const response = await this.ratingsService.create(newRating);
        // TODO: Gestionar respuesta si hay error
        
      }

      this.router.navigate(['/perfil']);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Hay campos del formulario incompletos!'
      });
    }
  }
}
