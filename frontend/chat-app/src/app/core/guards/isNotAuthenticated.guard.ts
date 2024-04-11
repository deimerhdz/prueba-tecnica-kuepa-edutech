import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { AuthStatus } from '@core/enums/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(AuthStatus.AUTHENTICATED);
  
 if(authService.authStatus() === AuthStatus.AUTHENTICATED){
   router.navigateByUrl('/home')
  return false;
 }
 return true;
};
