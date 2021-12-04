import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  panelOpenState:boolean = true;
  name=localStorage.getItem('clientName')?.toUpperCase ()
  carrito:any=[]
  companies:any=[]
  byCompaniesOrder:any=[]


  constructor(private modalService: NgbModal,private router:Router) { }

  ngOnInit(): void {
     this.getcarrito()
  }
cancelar(companyName:string){
var newCarrito=this.carrito.filter(function(itm:any){return itm.company!=companyName})
console.log(newCarrito)
//localStorage.removeItem('carrito')
   localStorage.setItem('carrito',JSON.stringify(newCarrito))
   window.location.reload()

}
  pagar(company:any){
    console.log(company)
    this.modalService.dismissAll()
    this.router.navigate(['/store/buyer',JSON.stringify(company)]);
  }
  getcarrito(){
  
  if(this.carrito=localStorage.getItem('carrito')!=null){
    this.carrito=localStorage.getItem('carrito')
    this.carrito=JSON.parse(this.carrito)

    // this.carrito.forEach((element: any) => {
    //   if(this.companies.includes(element.company)==false ){
    //    this.companies.push(element.company)
 
    //   }
 
    // });

     this.carrito.forEach((element: any) => {
       if(this.companies.includes(element.company)==false ){
        this.companies.push(element.company)
        this.byCompaniesOrder.push({"company":element.company,"order":[]})
       }
     });
      
     this.byCompaniesOrder.forEach((element:any) => {
       for(let i=0; i<this.carrito.length;i++){
         if(this.carrito[i].company==element.company){
            element.order.push(this.carrito[i])
         }
       }
     });
    
  }
   
   console.log('bycomp',this.byCompaniesOrder)
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


