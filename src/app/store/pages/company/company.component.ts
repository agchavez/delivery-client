import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal,NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { ProductsService } from '../../services/products.service';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertType, NameAlert, ColorAlert,  } from 'src/app/shared/interfaces/alert.interface';
import { faExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  panelOpenState:boolean = true;
  categorySelected: any={};
  company:any={}
  idCompany:string=''
  products:any=[]
  categories:any=[]
  product:any=[]
  cantProduct:number=0
  cantComplements:number[]=[]
  moneyComplements:number[]=[]
  totalProductMoney:number=0
  totalMoney:number=0
  positionsComp:number[]=[]
  carrito:any=[]
  alert!:AlertType;

  
  constructor(private carouselService: NgbModal, public  dialog: MatDialog,private modalService: NgbModal, private route: ActivatedRoute,private companiesService: CompaniesService,private fb: FormBuilder, private productsService:ProductsService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id =params['id']
      this.idCompany=id
      console.log('id: ',id)
    })
    this.getCategory()
    this.getCompany()
    this.getProducts()
  }

totalProduct(money:number){
   this.totalProductMoney=money
   this.totalMoney=this.totalProductMoney

    for(let i=0;i<this.moneyComplements.length;i++){
      
      this.totalMoney+=this.moneyComplements[i]
    }
}
total(money:number,pos:number){
  if(money==0){
    this.positionsComp.splice(pos,1)
  }
  else{
    this.positionsComp[pos]=pos

  }
    this.moneyComplements[pos]=money
    console.log(this.moneyComplements)
    console.log(pos)
    this.totalMoney=this.totalProductMoney

    for(let i=0;i<this.moneyComplements.length;i++){
      
      this.totalMoney+=this.moneyComplements[i]
    }

  }
  
agregar(){
  var complements:any=[]
  
  for(let i=0;i<this.positionsComp.length;i++){
    complements.push(
      
      this.product.complemts[this.positionsComp[i]].name)
  }
  let objectPedido={
    "company":this.company.name,
    "nameProduct":this.product.name,
    "complements":complements,
    "total":this.totalMoney,
    "cant":this.cantProduct
  }
  
  if(localStorage.getItem('carrito')!=null){
    this.carrito=localStorage.getItem('carrito')
    this.carrito = JSON.parse(this.carrito)
 
  }
  for(let i=0; i<this.carrito.length;i++){
    if(this.carrito[i].nameProduct==objectPedido.nameProduct&&this.carrito[i].company==objectPedido.company){
    this.modalService.dismissAll()
      
      this.alert = {
        name: NameAlert.warnig,
        icon: faExclamation,
        msj:"El producto ya se encuentra en el carrito",
        color: ColorAlert.error
      }
      this.openDialog();
    return

    }
  }
  this.carrito.push(objectPedido)

  localStorage.setItem('carrito',JSON.stringify(this.carrito))
  this.alert = {
    name: NameAlert.success,
    icon: faExclamation,
    msj:"Pedido Agregado al carrito",
    color: ColorAlert.success
  }
  this.openDialog();
  
  this.modalService.dismissAll()
  window.location.reload()
  
}
openDialog(){
  this.dialog.open(AlertComponent,{
    hasBackdrop: false,
    data: this.alert
  });
}
  getProducts(){
    this.productsService.getProductsByCompany(this.idCompany).subscribe(
      res=>{
        this.products=res.products
        for(let i=0;i<this.products.length;i++){
          this.categories.push({name:this.products[i]._id,id:this.products[i].idCat[0]})
        }
        console.log('products',this.products)
      },
      error=>{
        console.log(error)
      }
    )
  }

  getById(idCat:string){
    this.productsService.getProductsByCat(this.idCompany,idCat).subscribe(
      res=>{
        this.products=res.products
        console.log('products',this.products)
      },
      error=>{
        console.log(error)
      }
    )
  }

  getCompany(){
     this.companiesService.getCompaniesById(this.idCompany).subscribe(
      res=>{
        this.company=res.company
        console.log('company:',this.company)

      },
      error=>{
        console.log(error)
      }
    );
    }
  DetailProduct(modal:any,product:any){
    this.modalService.open(modal, 
      {size:'lg',
    })

    this.product=product
    console.log(this.product)
  }

  getCategory(){
    this.categorySelected=localStorage.getItem('categoriaSeleccionada')
    this.categorySelected=JSON.parse(this.categorySelected)
   
  }
}
