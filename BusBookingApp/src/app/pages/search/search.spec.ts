import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { Master } from '../../service/master';
import { APP_SERVICE_CONFIG } from '../../config/appConfig.service';
import { AppConfig } from '../../config/appConfig.interface';
import { Observable } from 'rxjs';

const spyFn = {
  getLocation: vi.fn().mockReturnValue(new Observable<any>()),
  searchBuses: vi.fn().mockReturnValue(new Observable<any>()),
};

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  const mockConfig: AppConfig = {
    apiUrl: 'https://mockapi.example.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
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

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize busLocations$ on ngOnInit', () => {
    component.ngOnInit();
    expect(spyFn.getLocation).toHaveBeenCalled();
  });

  it('should perform search on onSearch', () => {
    component.searchLocation = {
      fromLocationId: '1',
      toLocationId: '2',
      scheduleDate: '2023-10-10',
    };
    component.onSearch();
    expect(spyFn.searchBuses).toHaveBeenCalledWith('1', '2', '2023-10-10');
  });

  it('should calculate duration correctly', () => {
    const duration = component.calculateDuration('2023-10-10T08:00:00', '2023-10-10T10:30:00');
    expect(duration).toBe('2h 30m');
  });
});
