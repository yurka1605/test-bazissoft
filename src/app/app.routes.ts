import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login),
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./core/layout/main-layout/main-layout').then(m => m.MainLayout),
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/routes').then((m) => m.routes),
            },
            {
                path: 'history',
                loadChildren: () => import('./features/history/routes').then((m) => m.routes),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
