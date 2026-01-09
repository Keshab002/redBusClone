import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BusBooking } from '../models/busBooking.interface';
import { APP_SERVICE_CONFIG } from '../config/appConfig.service';
import { AppConfig } from '../config/appConfig.interface';
import { searchBooking } from '../models/searchBooking.interface';

@Injectable({
  providedIn: 'root',
})
export class Master {
  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig) {}

  getLocation() {
    return this.http.get<{ message: string; data: BusBooking[] }>(
      `${this.appConfig.apiUrl}/GetBusLocations`
    );
  }

  searchBuses(fromLocationId: number, toLocationId: number, scheduleDate: string) {
    return this.http.get<{ message: string; data: searchBooking[] }>(
      `${this.appConfig.apiUrl}/SearchBuses?fromLocationId=${fromLocationId}&toLocationId=${toLocationId}&scheduleDate=${scheduleDate}`
    );
  }

  getBusbyScehduleId(scheduleId: number) {
    console.log('In service', scheduleId);
    return this.http.get<{ message: string; data: searchBooking }>(
      `${this.appConfig.apiUrl}/GetSpecificBus?scheduleId=${scheduleId}`
    );
  }

  getBookedSeats(scheduleId: number) {
    return this.http.get<{ message: string; data: number[] }>(
      `${this.appConfig.apiUrl}/GetBookedSeats?scheduleId=${scheduleId}`
    );
  }

  registerUser(registerObj: any) {
    return this.http.post<{ message: string; data: Record<string, any> }>(
      `${this.appConfig.apiUrl}/register`,
      registerObj
    );
  }

  loginUser(loginObj: any) {
    return this.http.post<{ message: string; data: Record<string, any> }>(
      `${this.appConfig.apiUrl}/login`,
      loginObj
    );
  }

  postBooking(bookingObj: any) {
    return this.http.post<{ message: string; data: Record<string, any> }>(
      `${this.appConfig.apiUrl}/BookSeats`,
      bookingObj
    );
  }

}
