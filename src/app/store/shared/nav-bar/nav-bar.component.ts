import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../services/order.service';
import { CompaniesService } from '../../services/companies.service';

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
  orders:any=[]
  idBuyer:any
  ordersCompany:any=[]
  sizeOrders:any

  constructor(private modalService: NgbModal,private router:Router,private orderService:OrderService,private companieService:CompaniesService) { }

  ngOnInit(): void {
     this.getcarrito()
     if(localStorage.getItem('id')!=null){
      this.idBuyer=localStorage.getItem('id')
    this.getOrders()
 
    }
  }

  cerrarS(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('clientName')
    this.router.navigateByUrl('/')
  }
  //ordenes pagadas
  getOrders(){
    this.orderService.getOrders(this.idBuyer).subscribe(
      res=>{
        this.orders=res.orders
        this.orders.forEach((element:any) => {
          var id=element.prod[0].company
          this.companieService.getCompanyById(id).subscribe(
            res=>{
              if(element.status!='cancelled'){
                this.ordersCompany.push({
                  "id":element._id,
                  "status":element.status,
                  "company":res.name
                })
              }

              
            }
           
          )
        }
        );
        this.sizeOrders=this.ordersCompany.length
       
        
    console.log("orders: ",this.ordersCompany)
  
      },
      error=>{
        console.log(error)
      }
    );
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
     this.orders=[]
     this.ordersCompany=[]
    this.modalService.open(modal, 
      {size:'md',
    })
    this.getOrders()
  }

  abrirModalCarrito(modal:any){
    this.carrito=[]
  this.byCompaniesOrder=[]
   this.companies=[]
    this.modalService.open(modal, 
      {size:'md',
    })
    this.getcarrito()

  }
}


