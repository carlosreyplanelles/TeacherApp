import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.bookedClasses.push({date:'12/12/2022', hour:'10:00'})
    this.startingHour = 9
    this.endingHour = 20
    
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

  onSelect(event:any){
    console.log("funciono")
  }

  selectTime(slot:any){
   this.selectedSlot = slot
  }

  createSlots(date:any){
    bookedClasses=classes.find(c=>c.date == date)
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
