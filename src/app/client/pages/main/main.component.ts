import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  regionVisible='perfil'

  constructor() { }

  ngOnInit(): void {
  }

  verTarjetas(){
    this.regionVisible='tarjetas'
  }

  verPerfil(){
this.regionVisible='perfil'
  }
}
