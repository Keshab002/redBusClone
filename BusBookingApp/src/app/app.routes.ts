import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Booking } from './pages/booking/booking';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: Search
    },
    {
        path: 'booking/:scheduleId',
        component: Booking,
        canActivate: [authGuard]
    }
];
