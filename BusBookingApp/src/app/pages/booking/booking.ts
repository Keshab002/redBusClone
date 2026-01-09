import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Master } from '../../service/master';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [MatExpansionModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  scheduleId: number = 0;
  seatArray: number[] = [];
  bookedSeats: number[] = [];
  userSelectedSeats: any[] = [];
  customerId!: number;

  constructor(
    private router: ActivatedRoute,
    private masterService: Master,
    private cdr: ChangeDetectorRef,
    private navigate: Router
  ) {
    this.scheduleId = this.router.snapshot.paramMap.get('scheduleId') as unknown as number;
    this.customerId = JSON.parse(localStorage.getItem('RedBusUser')!).userId;
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
    const obj = {
      passengerId: 0,
      bookingId: 0,
      passengerName: '',
      age: 0,
      gender: '',
      seatNo: 0,
    };

    obj.seatNo = seatNumber;
    if (this.checkIfBooked(seatNumber)) {
      return; // Seat is already booked
    } else {
      this.userSelectedSeats.push(obj);
    }
  }

  checkIfSelected(seatNumber: number): boolean {
    return this.userSelectedSeats.findIndex((seat) => seat.seatNo === seatNumber) !== -1;
  }

  deselectSeat(seatNumber: number) {
    this.userSelectedSeats = this.userSelectedSeats.filter((seat) => seat.seatNo !== seatNumber);
  }

  bookSeat() {
    let obj = {
      bookingId: 0,
      custId: this.customerId,
      bookingDate: new Date().toISOString(),
      scheduleId: this.scheduleId,
      BusBookingPassengers: this.userSelectedSeats,
    };

    this.masterService.postBooking(obj).subscribe({
      next: (res) => {
        alert(res.message || 'Booking Successful!');
        this.navigate.navigateByUrl('/search');
      },
      error: (err) => {
        alert(err.error.message || 'Booking Failed. Please try again.');
      },
    });
  }
}
