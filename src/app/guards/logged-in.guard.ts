import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CanMatchFn } from '@angular/router';

export const loggedInGuard = (): CanMatchFn => {
  return () => {
    const authService = inject(AuthService);
    return authService.hasValidToken();
  };
};
