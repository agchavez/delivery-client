
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'asdad5'
  })
};

@Injectable({
    providedIn: 'root'
  })
  export class DirectionService {
    private baseUrl:string = environment.baseUrl;
    constructor(private httpClient:HttpClient){

    }
    
    // postDirection(idBuyer:string,depto:string,muni:string,lat:number,long:number){
    //     const url = `${this.baseUrl}/direction-buyer/`;
    
    //       const direction = {
    //         idBuyer:idBuyer,
    //       depto:depto,
    //       muni:muni,
    //       lat:lat,
    //       long:long
    //       }
    
    //       console.log('registrar direccion')
    //       console.log(direction)
    //       return this.httpClient.post(url,direction)
         
          
    //   } 
  }


