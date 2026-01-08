import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Master } from '../../service/master';
import { BusBooking } from '../../models/busBooking.interface';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { searchBooking } from '../../models/searchBooking.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, FormsModule, JsonPipe, DatePipe, CurrencyPipe,RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  // What does inject do here?
  // It allows the Search component to access the Master service for dependency injection.
  // This enables the component to use methods and properties defined in the Master service.
  masterService = inject(Master);

  busLocations$: Observable<BusBooking[]> = new Observable<BusBooking[]>();
  bustickets$: Observable<searchBooking[]> = new Observable<searchBooking[]>();

  searchLocation: any = {
    fromLocationId: '',
    toLocationId: '',
    scheduleDate: '',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.busLocations$ = this.masterService.getLocation().pipe(map((res) => res.data));
  }

  onSearch() {
    console.log(this.searchLocation);
    const { fromLocationId, toLocationId, scheduleDate } = this.searchLocation;
    this.bustickets$ = this.masterService
      .searchBuses(fromLocationId, toLocationId, scheduleDate)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  calculateDuration(start: string, end: string) {
    const d1 = new Date(start);
    const d2 = new Date(end);

    const diff = d2.getTime() - d1.getTime(); // milliseconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  }
}
