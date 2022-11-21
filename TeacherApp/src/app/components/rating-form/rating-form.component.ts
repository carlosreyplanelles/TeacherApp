import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingsService } from 'src/app/services/ratings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  // Este dato se obtendrá de la sesión activa
  studentId: number = 108;

  ratingForm: FormGroup;
  currentRating: any;
  teacherId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ratingsService: RatingsService,
    private router: Router
  ) {
    this.ratingForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      comment: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.teacherId = parseInt(params.teacherId);
      // TODO: Obtener la información del profesor para mostrarla en el formulario

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

      this.router.navigate(['/student-profile']);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Hay campos del formulario incompletos!'
      });
    }
  }

}
