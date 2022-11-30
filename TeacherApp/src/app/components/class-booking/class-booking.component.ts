import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.component.html',
  styleUrls: ['./class-booking.component.css']
})
export class ClassBookingComponent implements OnInit {

  selected!: Date | null;
  slots: any[]=[]
  constructor() { }

  ngOnInit(): void {
    for(let i=8;i<=20;i++){
      let slot = {
        hour: i+':00',
        available: 1
      }
      this.slots.push(slot)
      console.log(this.slots)
    }
  }

}
