import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as mapboxgl  from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { UbicationService } from '../../services/ubication.service';
import { DirectionService } from '../../services/directionBuyer.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  ubications:any=[]
  latLong:any=[]
  municipallies:any
  munic:any
  fullRequired:boolean=false
  
  // myForm:FormGroup = this.fb.group({
  //   depto: ['',[Validators.required]],
  //   muni: ['',[Validators.required]],
  //   lat: ['',[Validators.required]],
  //   long:['',[Validators.required]]
  // })
  myForm = {
    idBuyer:'61623d7e9f3d78f07e0f3744',
    depto:'Francisco Morazán',
    muni:'Orica',
    lat:14.712095046863453,
    long:-86.94349051531475
  }

  
  clickMarker:any = 0

  constructor(private ubicationService: UbicationService, private fb: FormBuilder,private direction  : DirectionService) { }

  ngOnInit(): void {
    

   //this.addMarker(map,this.clickMarker)

    this.getUbications()

  }
check(){
  this.loadMap()

  this.fullRequired=true
}


  register(){
    console.log(this.latLong)


    // const {idBuyer,depto,muni,lat,long} = this.myForm;
   
    // this.direction.postDirection(idBuyer,depto,muni,lat,long).subscribe(resp=>{

    //   console.log(resp)
    // })
    //console.log(long)


  }

  // addMarker(map:any,clic:number){
  //   var marker:any;
  //   var button;
    
  //   map.on('click', function (e:any) {
  //     clic++
  //     if(clic==1){
  //       console.log(e.lngLat)
  //       button = document.createElement('div')
  //       button.className='marker'
  //       marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);
        
  //     }  

  //     else{
  //       marker.remove()
  //       console.log(e.lngLat)

  //       marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);

  //     }

  //     });
  // }

  

  getUbications(){
    this.ubicationService.getUbication().subscribe(
      res=>{
        this.ubications=res.ubications[0]

        console.log('ubications:',this.ubications)
      },
      error=>{
        console.log(error)
      }
    )
    
  }

  save(){
    localStorage.setItem('ubication',JSON.stringify({'depto':this.municipallies[1],'muni':this.latLong}))
  }

  getMunicipally(){

    this.munic=['']
    this.munic=this.municipallies[0]
    console.log(this.munic)
    //this.municipallies=mun
    //console.log(mun)
    //this.municipal()
    
  }

  loadMap(){
    (mapboxgl as any).accessToken = environment.mapsToken;
    const map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[this.latLong.long,this.latLong.lat],
    zoom:8
    });
  }

  municipal(){
    this.municipallies=this.municipallies[0]  
  }
}
