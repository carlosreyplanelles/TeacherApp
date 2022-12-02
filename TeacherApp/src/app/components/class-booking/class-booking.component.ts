import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.component.html',
  styleUrls: ['./class-booking.component.css']
})
export class ClassBookingComponent implements OnInit {

  selected!: Date | null;
  slots: any[]=[]
  startingHour!:number
  endingHour!:number
  selectedSlot!:any;
  bookedClasses:any[]=[]
  classesByDate:any[]=[]
  selectedClass:any = null

  constructor() { }

  ngOnInit(): void {
    this.bookedClasses.push({hour:'10:00'})
    this.startingHour = 9
    this.endingHour = 20
    this.createSlots()
  }

  onSelect(date:Date){

    let format = 'yyyy-MM-dd'
    let locale = 'en-US'

    let formattedDate = formatDate(date, format ,locale)
    this.createSlots(formattedDate)

    this.selectedClass=null
  }

  selectTime(slot:any){
   this.selectedSlot = slot
  }

  createSlots(date:String = ""){
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
}
