import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private route: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/refreshToken') > -1) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status == 401) {
          return this.handle401Error(request, next, error);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: any
  ) {
    return this.authService.refreshCookie().pipe(
      switchMap(() => {
        return next.handle(req);
      }),
      catchError((error) => {
        localStorage.removeItem('user');

        this.route.navigate(['/auth/login']);
        return throwError(() => originalError);
      })
    );
  }
}
