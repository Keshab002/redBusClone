import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { App } from '../app';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const user = auth.loggedinUser;
  console.log('Auth Guard:', user);

  return !!user;
};
