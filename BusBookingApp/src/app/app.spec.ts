import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { Master } from './service/master';
import { APP_SERVICE_CONFIG } from './config/appConfig.service';

let MockMasterService = {
  loginUser: vi.fn().mockReturnValue(of({ data: {}, message: '' })),
  registerUser: vi.fn().mockReturnValue(of({ data: {}, message: '' })),
};

const mockConfig = {
  apiUrl: 'https://mockapi.example.com',
};

describe('App', () => {
  beforeEach(async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Master, useValue: MockMasterService },
        { provide: APP_SERVICE_CONFIG, useValue: mockConfig },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open Modal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.openModal();
    expect(app.isOpen).toBeTruthy();
  });

  it('should close Modal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.closeModal();
    expect(app.isOpen).toBeFalsy();
  });

  it('should toggle isLogin State', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const initialState = app.isLogin;
    app.toggleLogin();
    expect(app.isLogin).toBe(!initialState);
  });

  it('should call registerUser from Master service on registerUser method call', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.onRegister({ reset: vi.fn() });
    expect(MockMasterService.registerUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should call loginUser from Master service on loginUser method call', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.onLogin({ reset: vi.fn() });
    expect(MockMasterService.loginUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should logout user', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    localStorage.setItem('RedBusUser', JSON.stringify({ name: 'Test User' }));
    app.onLogout();
    expect(app.loggedinUser).toBeNull();
    expect(localStorage.getItem('RedBusUser')).toBeNull();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should initialize loggedinUser from localStorage if present', () => {
    const userData = { name: 'Test User' };
    localStorage.setItem('RedBusUser', JSON.stringify(userData));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.loggedinUser).toEqual(userData);
    expect(app.isOpen).toBeFalsy();
  });

  it('should called onLogin on login form submit', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.isOpen = true;
    app.isLogin = true;
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button')
    ) as HTMLButtonElement[];

    const signInButton = buttons.find((btn) => btn.textContent?.trim() === 'Sign in');

    const loginSpy = vi.spyOn(app, 'onLogin');

    expect(signInButton).toBeTruthy();
    signInButton?.click();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalled();
  });
});
