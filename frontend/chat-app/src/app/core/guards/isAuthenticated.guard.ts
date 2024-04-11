import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { AuthStatus } from '@core/enums/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 if(authService.authStatus() === AuthStatus.AUTHENTICATED){
  return true;
 }
 if(authService.authStatus() === AuthStatus.CHECKING){
  return false;
 }

 router.navigateByUrl('/auth/login')
 return false;
};
