import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve) => {
          if(this.authService.userProfile.value.role == "ADMIN"){
            resolve(true);
          }else if(this.authService.userProfile.value.role == "TEACHER" || this.authService.userProfile.value.role == "STUDENT"){
            resolve(false);
          } else {
            this.router.navigate(['/dashboard']);
            resolve(false);
          }   
        }) 
  }
  
}
