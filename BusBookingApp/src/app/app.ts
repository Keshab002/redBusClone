import {
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Master } from './service/master';
import { UserRegisterInterface } from './models/userData.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('BusBookingApp');
  isOpen = false;
  isLogin = true;
  loggedinUser: any = null;

  randomNumber = Math.random();

  registerObj: UserRegisterInterface = {
    userId: this.randomNumber,
    userName: '',
    emailId: '',
    fullName: '',
    role: '',
    createdDate: new Date(),
    password: '',
    projectName: '',
    refreshToken: '',
    refreshTokenExpiryTime: new Date(),
  };

  loginObj = {
    emailId: '',
    password: '',
  };

  constructor(private masterService: Master, private cdr: ChangeDetectorRef) {
    const userData = localStorage.getItem('RedBusUser');
    if (userData) {
      this.loggedinUser = JSON.parse(userData);
      this.isOpen = false;
      console.log(userData);
    }
  }

  // @ViewChild('myModal') myModal: ElementRef | undefined;

  // ngAfterViewChecked() {
  //   if (this.myModal) console.log(this.myModal.nativeElement.style.backgroundColor="black");
  //   this.cdr.markForCheck();
  // }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  onRegister(registerForm: any) {
    console.log(this.registerObj);
    this.masterService.registerUser(this.registerObj).subscribe({
      next: (res) => {
        alert(res.message || 'Registration Successful!');
        localStorage.setItem('RedBusUser', JSON.stringify(res.data));
        this.loggedinUser = res.data;
        this.closeModal();
        this.cdr.markForCheck();
        registerForm.reset();
      },
      error: (err) => {
        alert(err.error.message || 'Registration Failed. Please try again.');
      },
    });
  }

  onLogin(loginForm: any) {
    console.log(this.loginObj);
    this.masterService.loginUser(this.loginObj).subscribe({
      next: (res) => {
        alert(res.message || 'Login Successful!');

        localStorage.setItem('RedBusUser', JSON.stringify(res.data));
        this.loggedinUser = res.data;
        this.closeModal();
        this.cdr.markForCheck();
        loginForm.reset();
      },
      error: (err) => {
        alert(err.error.message || 'Login Failed. Please try again.');
      },
    });
  }

  onLogout() {
    localStorage.removeItem('RedBusUser');
    this.loggedinUser = null;
  }
}
