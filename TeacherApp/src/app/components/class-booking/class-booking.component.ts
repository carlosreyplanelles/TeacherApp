import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.component.html',
  styleUrls: ['./class-booking.component.css']
})
export class ClassBookingComponent implements OnInit {

  selected!: Date | String | null;
  teacherId!: number
  slots: any[]=[]
  startingHour!:number
  endingHour!:number
  selectedSlot:any = null;
  bookedClasses:any[]=[]
  classesByDate:any[]=[]

  constructor(private activatedRoute: ActivatedRoute,
    private loginAuthService:LoginAuthService) { }

  ngOnInit(): void {
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
      const booking = {
        teacherId: this.teacherId,
        studentId: this.loginAuthService.getId(),
        time: this.selectedSlot.time,
        date: this.selected
      }
  }
}
