import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booking } from './booking';
import { Master } from '../../service/master';
import { APP_SERVICE_CONFIG } from '../../config/appConfig.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

const spyFn = {
  // Add spies for Master service methods if needed
  getBusbyScehduleId: vi.fn().mockReturnValue(of({ data: {} })),
  getBookedSeats: vi.fn().mockReturnValue(of({ data: [] })),
  postBooking: vi.fn().mockReturnValue(of({ data: {} })),
};

describe('Booking', () => {
  let component: Booking;
  let fixture: ComponentFixture<Booking>;
  const mockConfig = {
    apiUrl: 'https://mockapi.example.com',
  };

  beforeEach(async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    localStorage.setItem('RedBusUser', JSON.stringify({ name: 'Test User', customerId: 123, userId: 123 }));
    await TestBed.configureTestingModule({
      imports: [Booking],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: vi.fn().mockReturnValue('12'),
              },
            },
          },
        },
        {
          provide: Master,
          useValue: spyFn,
        },
        {
          provide: APP_SERVICE_CONFIG,
          useValue: mockConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Booking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize customerId and call getBusDetails and getBookedSeats', () => {
    const getBusDetailsSpy = vi.spyOn(component, 'getBusDetails');
    const getBookedSeatsSpy = vi.spyOn(component, 'getBookedSeats');
    
    component.ngOnInit();

    expect(component.customerId).toBe(123);
    expect(getBusDetailsSpy).toHaveBeenCalledWith(component.scheduleId);
    expect(getBookedSeatsSpy).toHaveBeenCalledWith(component.scheduleId);
  });

  it('should check if seat is booked', () => {
    component.bookedSeats = [1, 2, 3];
    expect(component.checkIfBooked(2)).toBe(true);
    expect(component.checkIfBooked(4)).toBe(false);
  });
  
  it('should select a seat if not booked', () => {
    component.bookedSeats = [1, 2, 3];
    component.selectSeat(4);
    expect(component.userSelectedSeats.length).toBe(1);
    expect(component.userSelectedSeats[0].seatNo).toBe(4);
  });

  it('should not select a seat if booked', () => {
    component.bookedSeats = [1, 2, 3];
    component.selectSeat(2);
    expect(component.userSelectedSeats.length).toBe(0);
  });
  
  it('should check if seat is selected', () => {
    component.userSelectedSeats = [{ seatNo: 5 }];
    expect(component.checkIfSelected(5)).toBe(true);
    expect(component.checkIfSelected(6)).toBe(false);
  });

  it('should book selected seats', () => {
    const router = TestBed.inject(Router);
    component.userSelectedSeats = [
      { passengerId: 0, bookingId: 0, passengerName: 'John', age: 30, gender: 'M', seatNo: 7 },
    ];
    component.scheduleId = 10;
    component.customerId = 123;

    component.bookSeat();

    expect(spyFn.postBooking).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Booking Successful!');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/search');
  }); 

});
