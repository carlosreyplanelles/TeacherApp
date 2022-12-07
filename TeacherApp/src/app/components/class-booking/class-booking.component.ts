import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import Swal from 'sweetalert2';
import { ClassesService } from 'src/app/services/classes.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.component.html',
  styleUrls: ['./class-booking.component.css']
})
export class ClassBookingComponent implements OnInit {

  selected!: Date | string;
  @Input() teacherId!: number
  slots: any[]=[]
  startingHour!:number
  endingHour!:number
  selectedSlot:any = null;
  bookedClasses:any[]=[]
  format = 'yyyy-MM-dd'
  locale = 'en-US'

  constructor(
    private loginAuthService:LoginAuthService,
    private classesService: ClassesService,
    private teachersService: TeachersService
  ) { }

  async ngOnInit(): Promise<void> {
   //Obtener horario del profesor 
    try {
      const hoursData =  await this.teachersService.getTeacherHours(this.teacherId);
      this.startingHour = hoursData.start_class_hour;
      this.endingHour = hoursData.end_class_hour;
      this.createSlots();
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al reservar',
        text: 'No se ha podido acceder al horario del profesor',
      });
    }
  }

  onSelect(date: Date){
    const selectedDate = formatDate(date, this.format ,this.locale); 
    this.selected = selectedDate   
    this.createSlots(this.selected);
    this.selectedSlot = null;
  }

  selectTime(slot:any){
   this.selectedSlot = slot
  }

  async createSlots(date:string = ""){
    this.slots=[]
    if(date!=""){
      this.bookedClasses = await this.classesService.getBookedClassesByTeacherDate (this.teacherId,date)
    } 
    for(let i=this.startingHour;i<=this.endingHour;i++){
      let bookedClass = this.bookedClasses.find(c=>c.start_hour==i)
      let slot = {
        id:i,
        hour: i+':00',
        available: bookedClass == undefined,
      }
      this.slots.push(slot)
    }
  }


  async bookSlot(){
    let response
    let bookingDate = formatDate(this.selected, this.format ,this.locale)
    Swal.fire({
      title: 'Reserva de clase',
      text: `Vas a reservar una clase el dia ${bookingDate} a las ${this.selectedSlot.hour} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const booking = {
          teacherId: this.teacherId,
          studentId: this.loginAuthService.getId(),
          start_hour: this.selectedSlot.id,
          start_date: formatDate(this.selected, this.format ,this.locale)
        }
        try{
          response = await this.classesService.create(booking)
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
            }})
          }
        }
