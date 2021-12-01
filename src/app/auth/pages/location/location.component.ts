import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as mapboxgl  from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { UbicationService } from '../../services/ubication.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  ubications:any=[]
  municipallies:any
  munic:any
    // Access ng-select
   // @ViewChild(food) ngSelectComponent: NgSelectComponent;

    // Call to clear
   // this.ngSelectComponent.handleClearClick();
  
  myForm:FormGroup = this.fb.group({
    depto: ['',[Validators.required]],
    muni: ['',[Validators.required]],
    lat: ['',[Validators.required]],
    long:['',[Validators.required]]
  })

  constructor(private ubicationService: UbicationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapsToken;
    const map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
    this.getUbications()

  }

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

  getMunicipally(){
    
    this.munic=['']
    this.munic=this.municipallies[0]
    console.log(this.munic)
    //this.municipallies=mun
    //console.log(mun)
    //this.municipal()
  }

  municipal(){
    this.municipallies=this.municipallies[0]  
  }
}
