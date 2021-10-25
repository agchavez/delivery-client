import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService
  ){}
  canActivate(): Observable<boolean> | boolean{
    return this.authService.validateToken();
  }
  canLoad(): Observable<boolean> | boolean{
    return this.authService.validateToken();
  }
}
