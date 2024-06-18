import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();
  if (isLoggedIn) {
    return true
  }
  return router.createUrlTree(['/login']);
};
