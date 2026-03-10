import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Permiso } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const auth   = inject(AuthService);
    const router = inject(Router);

    console.log('Guard ejecutado, estaLogueado:', auth.estaLogueado()); 
    console.log('Usuario:', auth.usuario()); 

    if (!auth.estaLogueado()) {
        return router.createUrlTree(['/login']);
    }
    return true;
};

export function permisoGuard(permiso: Permiso): CanActivateFn {
    return () => {
        const auth   = inject(AuthService);
        const router = inject(Router);

        if (!auth.estaLogueado()) {
            return router.createUrlTree(['/login']);
        }
        if (!auth.tienePermiso(permiso)) {
            return router.createUrlTree(['/app/home']);
        }
        return true;
    };
}