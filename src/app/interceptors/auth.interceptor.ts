import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

function setAuthorizationHeader(headers: HttpHeaders) {
  const token = inject(AuthService).getToken();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

function handleError(error) {
  if (error.status === 401) {
    inject(Router).navigate(['/login']);
  }
  return throwError(() => error);
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authReq = req.clone({
    headers: setAuthorizationHeader(req.headers),
  });
  return next(authReq).pipe(catchError(handleError));
}
