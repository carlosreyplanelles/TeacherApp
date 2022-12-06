import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import Swal from 'sweetalert2';

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

  constructor(private activatedRoute: ActivatedRoute,
    private loginAuthService:LoginAuthService) { }

  ngOnInit(): void {
    //TODO:Get clases por teacherId
    //bookedClasses = await this.classService.getClassByTeacherId(teacherId)
      this.bookedClasses.push({ hour: '10:00' })
      this.startingHour = 9
      this.endingHour = 20
      this.createSlots()
  }

  onSelect(date:Date){

    let format = 'yyyy-MM-dd'
    let locale = 'en-US'

    this.selected = formatDate(date, format ,locale)
    this.createSlots(this.selected)
    this.selectedSlot= null
  }

  selectTime(slot:any, event:any){
   this.selectedSlot = slot
   console.log(event.target)

  }

  createSlots(date:String = ""){
    this.slots=[]
    //TODO:Filtrar clases por fecha
    //classesByDate = bookedClasses.filter(c => c.date == date)
    for(let i=this.startingHour;i<=this.endingHour;i++){
      let bookedClass = this.bookedClasses.find(c=>c.hour==i)//TODO: cambiar por classesByDate.find
      let slot = {
        id:i,
        hour: i+':00',
        available: bookedClass == undefined,
        selected: false
      }
      this.slots.push(slot)
    }
  }


  async bookSlot(){
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
        //TODO:Llamar al create de la clase
        /*
        try{
          response = await this.classService.create().
          if(response.id){
            Swal.fire(
          'Reserva realizada',
          'Su clase ha sido reservada.',
          'success'
        )
          }
        }
        catch(error){
          Swal.fire({
                  icon: 'error',
                  title: 'Error al reservar',
                  text: 'Ha ocurrido un error intentelo de nuevo más tarde',
                })
        }
        */ 
      }
    })
      
  }
}
