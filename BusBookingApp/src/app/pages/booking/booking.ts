import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Master } from '../../service/master';

@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  scheduleId: number = 0;
  seatArray: number[] = [];
  bookedSeats: number[] = [];
  userSelectedSeats: number[] = [];

  constructor(
    private router: ActivatedRoute,
    private masterService: Master,
    private cdr: ChangeDetectorRef
  ) {
    this.scheduleId = this.router.snapshot.paramMap.get('scheduleId') as unknown as number;
  }

  ngOnInit(): void {
    this.getBusDetails(this.scheduleId);
    this.getBookedSeats(this.scheduleId);
  }

  getBusDetails(scheduleId: number) {
    console.log(scheduleId, 'number');
    console.log('Here');
    this.masterService.getBusbyScehduleId(scheduleId).subscribe((res) => {
      console.log(res);
      for (let i = 1; i <= res.data.totalSeats; i++) {
        this.seatArray.push(i);
      }
      this.cdr.markForCheck();
    });
  }

  getBookedSeats(scheduleId: number) {
    this.masterService.getBookedSeats(scheduleId).subscribe((res) => {
      this.bookedSeats = res.data;
      this.cdr.markForCheck();
    });
  }

  checkIfBooked(seatNumber: number): boolean {
    return this.bookedSeats.includes(seatNumber);
  }

  selectSeat(seatNumber: number) {
    if (this.checkIfBooked(seatNumber)) {
      return; // Seat is already booked
    } else {
      this.userSelectedSeats.push(seatNumber);
    }
  }

  checkIfSelected(seatNumber: number): boolean {
    return this.userSelectedSeats.includes(seatNumber);
  }
}
