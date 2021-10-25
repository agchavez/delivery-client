import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, tap} from "rxjs/operators";
import { of } from "rxjs";
import { LoginResponse, Client } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private _client!: Client;


  get client(){
    return {...this._client}
  }

  constructor(
    private http:HttpClient
  ) { }

  login(email:string, password:string){
    const url = `${this.baseUrl}/client/login`;
    const body = {email,password}

    return this.http.post<LoginResponse>(url,body)
              .pipe(
                tap( resp => {

                  if (resp.ok) {
                    localStorage.setItem('token', resp.token!);
                  }
                }),
                map( resp => {
                  localStorage.removeItem('email-verfied');
                  return {ok :resp.ok, verified: true
                  }}),
                catchError( err => {

                  const temp:any  = err.error;

                  if (temp.verified != undefined) {
                      localStorage.setItem('email-verfied', email);
                      return of({
                        ok: false,
                        verified: false
                      });

                    }

                    return of({ok: false, verified: undefined})}
                  )
              );
  }

  ///client/validate

  validateToken ():Observable<boolean>{
    const url = `${this.baseUrl}/client/validate`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
    return this.http.get<LoginResponse>(url, { headers })
          .pipe(
            map(resp =>{
              if (resp.ok) {
                localStorage.setItem('token', resp.token!);
                this._client = resp.client!;

              }
               return resp.ok
            }),
            catchError(err => of(false))

          )
  }
  validateEmail(){
    const email = localStorage.getItem('email-verfied');
    if(email){
      return true;
    }else{
      return false;
    }
  }

  //TODO:Verificar codigo de verificacion del usuario
  verifiedCode(code:number){
    const email = localStorage.getItem('email-verfied');
    const url = `${this.baseUrl}/client/check/code`
    const body = {
      code, email
    }
    return this.http.put<LoginResponse>(url, body)
      .pipe(
        map(  resp => {
          if (resp.ok) {
            localStorage.removeItem('email-verfied');
          }
          return {ok:true, msj:resp.msj}
        }
        ),
        catchError(err => of({ok: err.error.ok ,msj: err.error.msj }))
      )
    ;


  }


}
