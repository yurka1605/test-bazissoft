import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@features/auth/pages/login/login').then(m => m.Login),
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('@core/layout/main-layout/main-layout.routes').then(m => m.routes),
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
