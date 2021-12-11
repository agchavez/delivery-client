
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';

import { tap, catchError, map } from 'rxjs/operators';
import { Client, RegisterClient } from '../interface/interfaces';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'asdad5'
  })
};

@Injectable({
    providedIn: 'root'
  })
  export class ClientsService {
    private baseUrl:string = environment.baseUrl;
    constructor(private httpClient:HttpClient){

    }

    getClient(idCLient:string):Observable<any>{
    const url = `${this.baseUrl}/client/${idCLient}`;

      return this.httpClient.get(url,{})
       // console.log(data)
  
  
      }

    registerClient(email:string,firstName:string,lastName:string,phone:string,password:string){
    const url = `${this.baseUrl}/client/register`;

      const persona = {
        email:email,
      firstName:firstName,
      lastName:lastName,
      phone:phone,
      password:password
      }

      console.log('registrar cliente')
      console.log(persona)
      return this.httpClient.post<RegisterClient>(url,persona).pipe(tap(resp=>{
        console.log(resp.msj)

      }), 
      map( resp => {
        localStorage.setItem('email-verfied', email);
        return {ok :resp.msj
        }}),
      catchError(err =>{
        const temp:any  = err.error;
          return of({ok:false})
      }))
      
  } 

  
  }