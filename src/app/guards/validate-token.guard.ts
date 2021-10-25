import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthService,
    private Router      : Router
  ){}
  canActivate(): Observable<boolean> | boolean{
    console.log("resp");
    return this.authService.validateToken()
      .pipe(
        tap( resp => {

            if(!resp){
              this.Router.navigateByUrl('/auth');
            }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean{
    return this.authService.validateToken()
    .pipe(
      tap( resp => {
        console.log("resp");
        if(!resp){
                this.Router.navigateByUrl('/auth');
              }
          })
        );
  }
}
