import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)
    },
    {
        path: 'landing',
        loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
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
                path: 'home',
                loadComponent: () => import('./pages/home/home').then(m => m.Home)
            }, 
            {
                path: 'perfil',
                loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
            },
            {
                path: 'groups',
                loadComponent: () => import('./pages/groups/groups').then(m => m.Groups)
            },
        ]
    }
];