
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
  export class ProductsService {
    private baseUrl:string = environment.baseUrl;
    constructor(private httpClient:HttpClient){

    }
    
    getCompaniesByCat(idCat:string):Observable<any>{
    const url = `${this.baseUrl}/product/by/${idCat}`;
    return this.httpClient.get(url,{})
     // console.log(data)


    }

    getProductsByCompany(idCompany:string):Observable<any>{
        const url = `${this.baseUrl}/product/bycompany/${idCompany}`;
        return this.httpClient.get(url,{})
         // console.log(data)
    
    
        }

        getProductsByCat(idCompany:string,idCat:string):Observable<any>{
            const url = `${this.baseUrl}/product/bycategory/${idCompany}/company/${idCat}`;
            return this.httpClient.get(url,{})
             // console.log(data)
        
        
            }
  }


