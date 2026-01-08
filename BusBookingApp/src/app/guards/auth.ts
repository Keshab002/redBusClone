import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  loggedinUser: any = null;

  constructor() {
    this.loggedinUser = localStorage.getItem('RedBusUser');
  }
}
