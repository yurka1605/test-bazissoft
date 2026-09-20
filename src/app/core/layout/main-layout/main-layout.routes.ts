import { Route } from '@angular/router'
import { authGuard } from '@core/auth';
import { MainLayout } from './main-layout';
import { NavRouteData } from './models/nav-route-data';

export const navRoutes = [
    {
        path: 'dashboard',
        loadChildren: () => import('@features/dashboard/routes').then((m) => m.routes),
        data: {
            title: 'Каталог товаров',
            order: 1,
        } satisfies NavRouteData,
    },
    {
        path: 'history',
        loadChildren: () => import('@features/history/routes').then((m) => m.routes),
        data: {
            title: 'История покупок',
            order: 2,
        } satisfies NavRouteData,
    },
];

export const routes: Route[] = [{
    path: '',
    canActivate: [authGuard],
    component: MainLayout,
    children: [
        ...navRoutes,
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        },
    ],
}];
