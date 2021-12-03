import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  panelOpenState:boolean = true;
  name=localStorage.getItem('clientName')?.toUpperCase ()
  carrito:any={}


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
     this.getcarrito()
  }

  getcarrito(){
  this.carrito=localStorage.getItem('carrito')
  this.carrito=JSON.parse(this.carrito)
  //return this.carrito
  }

  abrirModalPedido(modal:any){
    this.modalService.open(modal, 
      {size:'md',
    })
  }

  abrirModalCarrito(modal:any){
    this.modalService.open(modal, 
      {size:'md',
    })
  }
}


