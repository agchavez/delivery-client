
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
  export class CardService {
    private baseUrl:string = environment.baseUrl;
    constructor(private httpClient:HttpClient){

    }
    
    getCards(idBuyer:string):Observable<any>{
    const url = `${this.baseUrl}/card/all/${idBuyer}`;
    return this.httpClient.get(url,{})
     // console.log(data)


    }
    deleteCard(idCard:string):Observable<any>{
      const url = `${this.baseUrl}/card/delete/${idCard}`;
      return this.httpClient.delete(url,{})
       // console.log(data)
  
  
      }

    postCard(data:any):Observable<any>{
        const url = `${this.baseUrl}/card/`;
        return this.httpClient.post(url,data)
         // console.log(data)
    
    
        }
  }