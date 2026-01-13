import { TestBed } from '@angular/core/testing';

import { Master } from './master';
import { APP_SERVICE_CONFIG } from '../config/appConfig.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

const mockConfig = {
  apiUrl: 'https://mockapi.example.com',
};

// What does describe do in testing frameworks like Jasmine or Mocha?
// it is used to group related tests together, providing a way to organize and structure test cases for better readability and maintainability.
describe('Master', () => {
  let service: Master;
  let httpMock: HttpTestingController;

  // What is the purpose of beforeEach in testing frameworks?
  // beforeEach is used to set up a specific state or configuration before each test case runs, ensuring that each test starts with a clean and consistent environment.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Master,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: mockConfig,
        },
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(Master);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // What does it do in testing frameworks like Jasmine or Mocha?
  // it defines an individual test case, specifying the expected behavior or outcome that should be verified.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch bus locations', () => {
    const mockResponse = { message: '', data: [] };
    service.getLocation().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/GetBusLocations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search buses', () => {
    const mockResponse = { message: '', data: [] };
    let locationId = 1;
    let toLocationId = 2;
    let scheduleDate = '2024-01-01';

    service.searchBuses(locationId, toLocationId, scheduleDate).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(
      `${mockConfig.apiUrl}/SearchBuses?fromLocationId=${locationId}&toLocationId=${toLocationId}&scheduleDate=${scheduleDate}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get bus by schedule ID', () => {
    const mockResponse = { message: '', data: {} };
    let scheduleId = 1;

    service.getBusbyScehduleId(scheduleId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/GetSpecificBus?scheduleId=${scheduleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get booked seats', () => {
    const mockResponse = { message: '', data: [] };
    let scheduleId = 1;

    service.getBookedSeats(scheduleId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/GetBookedSeats?scheduleId=${scheduleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should register user', () => {
    const mockResponse = { message: '', data: {} };
    const registerObj = { username: 'test', password: 'test123' };

    service.registerUser(registerObj).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login user', () => {
    const mockResponse = { message: '', data: {} };
    const loginObj = { username: 'test', password: 'test123' };

    service.loginUser(loginObj).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should post booking', () => {
    const mockResponse = { message: '', data: {} };
    const bookingObj = { scheduleId: 1, seats: [1, 2, 3] };
    service.postBooking(bookingObj).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/BookSeats`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // What is the purpose of afterEach in testing frameworks?
  // afterEach is used to clean up or reset the state after each test case runs, ensuring that no residual effects from one test affect subsequent tests.
  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });
});
