import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  panelOpenState:boolean = true;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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


