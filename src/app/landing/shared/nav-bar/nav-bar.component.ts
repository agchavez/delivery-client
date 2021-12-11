import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  mostrar:boolean=false

  constructor() { }

  ngOnInit(): void {
  }

  mostrarOptions(){
    this.mostrar=!this.mostrar
  }
}
