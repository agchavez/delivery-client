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
                map( resp => resp.ok),
                catchError( err => of(false))
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
                this._client = resp.client!
                console.log("token set");

              }
               return resp.ok
            }),
            catchError(err => of(false))

          )
  }
}
