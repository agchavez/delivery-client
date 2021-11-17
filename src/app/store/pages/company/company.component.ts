import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  panelOpenState:boolean = true;
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }

  DetailProduct(modal:any){
    this.modalService.open(modal, 
      {size:'md',
    })
  }
}
