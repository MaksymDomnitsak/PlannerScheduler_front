import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userInfo = this.authService.loadUserFromLocalStorage();
      if (route.data['userType'] === 'guest') {
        return true;
      } else if (route.data['userType'] === 'logged-in') {
        if (userInfo.userId > 0) {
          return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
      }
      this.router.navigate(['/auth/login']);
      return false;
  }
  
}
