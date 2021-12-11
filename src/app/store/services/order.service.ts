
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'asdad5'
  })
};



@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    private baseUrl:string = environment.baseUrl;
    constructor(private httpClient:HttpClient){

    }
    
    postOrder(orderDetail:any):Observable<any>{
       

        console.log(orderDetail)
    const url = `${this.baseUrl}/order/`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    console.log({headers})
    return this.httpClient.post(url,orderDetail,{headers})
     // console.log(data)


    }

    getOrders(buyer:string):Observable<any>{
        const url = `${this.baseUrl}/order/buyer/${buyer}`;
        return this.httpClient.get(url,{})
         // console.log(data)
    
    
        }


  }