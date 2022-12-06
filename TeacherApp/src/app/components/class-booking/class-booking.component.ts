import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import Swal from 'sweetalert2';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.component.html',
  styleUrls: ['./class-booking.component.css']
})
export class ClassBookingComponent implements OnInit {

  selected!: Date | String | null;
  @Input() teacherId!: number
  slots: any[]=[]
  startingHour!:number
  endingHour!:number
  selectedSlot:any = null;
  bookedClasses:any[]=[]
  classesByDate:any[]=[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginAuthService:LoginAuthService,
    private classesService: ClassesService
  ) { }

  ngOnInit(): void {
    //TODO:Get clases por teacherId
    this.activatedRoute.params.subscribe((params: any) => {
      this.teacherId = params.teacherId;
      this.bookedClasses.push({ hour: '10:00' })
      this.startingHour = 9
      this.endingHour = 20
      this.createSlots()
    })
  }

  onSelect(date:Date){

    let format = 'yyyy-MM-dd'
    let locale = 'en-US'

    this.selected = formatDate(date, format ,locale)
    this.createSlots(this.selected)
    this.selectedSlot= null
  }

  selectTime(slot:any){
   this.selectedSlot = slot
  }

  createSlots(date:String = ""){
    this.slots=[]
    /**TODO:Get clases por teacherId y fecha
    this.classesService.getBookedClassesByTeacherDate(this.teacherId,date)*/
    for(let i=this.startingHour;i<=this.endingHour;i++){
      let bookedClass = this.bookedClasses.find(c=>c.hour==i)
      let slot = {
        id:i,
        hour: i+':00',
        available: bookedClass == undefined
      }
      this.slots.push(slot)
    }
  }

  bookSlot(){
    Swal.fire({
      title: 'Reserva de clase',
      text: `Vas a reservar una clase el dia ${this.selected} a las ${this.selectedSlot.hour} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        const booking = {
          teacherId: this.teacherId,
          studentId: this.loginAuthService.getId(),
          time: this.selectedSlot.time,
          date: this.selected
        }
        console.log("booking object en class-booking.component.ts", booking);
        /**TODO:Llamar al create de la clase
        this.classesService.create(booking);*/
        Swal.fire(
          'Reserva realizada',
          'Su clase se ha reservado satisfactoriamente.',
          'success'
        )
      }
    })
      
  }
}
