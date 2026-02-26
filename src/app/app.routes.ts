import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then(m => m.Register)
    },
    {
        path: '',
        loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
        children: [
            {
                path: 'landing',
                loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
            },
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home').then(m => m.Home)
            },
        ]
    }
];