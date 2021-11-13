import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthService,
    private router      : Router
  ){}
  canActivate(): Observable<boolean> | boolean {
    const emailExist =  this.authService.validateEmail();
    if (!emailExist){
        this.router.navigateByUrl('/auth')
        return false;
    }
    return true;
  }
  canLoad(): Observable<boolean > | boolean {
    const emailExist =  this.authService.validateEmail();
    if (!emailExist){
        this.router.navigateByUrl('/auth')
        return false;
    }
    return true;

  }
}
