import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CardService } from '../../services/cards.service';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertType, ColorAlert, NameAlert } from 'src/app/shared/interfaces/alert.interface';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  panelOpenState:boolean = true;
  latLong:any=[]
  clickMarker:any = 0
  idCard:any={"cvv":0}
  data:any=[]
  idBuyer:any=''
  cards:any
  cvv:number[]=[]
  totalProd:number=0
  alert!:AlertType;
  constructor(private route:ActivatedRoute,private cardService:CardService,public  dialog: MatDialog) { }

  ngOnInit(): void {
    this.latLong=localStorage.getItem('ubication')
   this.latLong=JSON.parse(this.latLong)
   this.latLong=this.latLong.muni
   


   this.loadMap()

   this.data= this.route.snapshot.paramMap.get('data')
   this.data=JSON.parse(this.data)
   console.log('data:',this.data)

   if(localStorage.getItem('id')!=null){
     this.idBuyer=localStorage.getItem('id')
   this.getCards()

   }

   for(let i=0;i<this.data.order.length;i++){
     this.totalProd+=this.data.order[i].total
   }


   //this.addMarker(map,this.clickMarker)
  }

  openDialog(){
    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });
  }


  getCards(){
     
     this.cardService.getCard(this.idBuyer).subscribe(
      res=>{
        this.cards=res.cards
    console.log("cards: ",this.cards)
  
      },
      error=>{
        console.log(error)
      }
    );
    }
  pagar(){
    if(this.idCard.cvv==0){
      this.alert = {
        name: NameAlert.warnig,
        icon: faExclamation,
        msj:"Seleccione una tarjeta para realizar su compra",
        color: ColorAlert.warnig
      }
      this.openDialog();
    }
    else{
      if(this.idCard.cvv==this.cvv[0]){
        this.alert = {
          name: NameAlert.success,
          icon: faExclamation,
          msj:"Gracias por su compra",
          color: ColorAlert.success
        }
        this.openDialog();

      }
      else{
        this.alert = {
          name: NameAlert.error,
          icon: faExclamation,
          msj:"Verifique el código cvv de su tarjeta",
          color: ColorAlert.error
        }
        this.openDialog();
      }

    }
    
   //console.log('1',this.idCard.cvv) 
  // console.log('2',this.cvv[0])
  }

  loadMap(){
    (mapboxgl as any).accessToken = environment.mapsToken;
    const map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[this.latLong.long,this.latLong.lat],
    zoom:8
    });

    this.addMarker(map,this.clickMarker)
  }

  addMarker(map:any,clic:number){
    var marker:any;
    var button;
    
    map.on('click', function (e:any) {
     clic++
      if(clic==1){
        console.log(e.lngLat)
        button = document.createElement('div')
        button.className='marker'
       marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);
        
      }  

      else{
        marker.remove()
        console.log(e.lngLat)

        marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);

      }

      });
  }
}
