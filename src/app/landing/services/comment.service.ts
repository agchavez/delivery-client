import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicResponse } from '../../shared/interfaces/interfacesResponse';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl:string = environment.baseUrl;
  constructor(
    private http:HttpClient
  ) { }

  sendMsj(data:any):Observable<BasicResponse>{
    const url = `${this.baseUrl}/client/comment`;
    const body = {
          ...data
        }
        console.log(data);

    return this.http.post<BasicResponse>(url, body);
  }
}
