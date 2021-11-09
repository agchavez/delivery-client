import { Component, OnInit } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapsToken;
    const map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}
