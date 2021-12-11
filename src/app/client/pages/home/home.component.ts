import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../auth/services/clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
idClient:any
data:any
  constructor(private clientService:ClientsService) { }

  ngOnInit(): void {
    this.getClient()
    this.getDataClient()
  }
  
  getClient(){
    this.idClient=localStorage.getItem('id')
  //  this.idClient=JSON.parse(this.idClient)
   
  }

  getDataClient(){
    this.clientService.getClient(this.idClient).subscribe(
     res=>{
       this.data=res.client
       console.log(this.data)

     },
     error=>{
       console.log(error)
     }
   );
   }


}
