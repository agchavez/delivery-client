import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { ProductsService } from '../../services/products.service';

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
 
  constructor(private modalService: NgbModal, private route: ActivatedRoute,private companiesService: CompaniesService,private fb: FormBuilder, private productsService:ProductsService) { }
  
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
  DetailProduct(modal:any){
    this.modalService.open(modal, 
      {size:'md',
    })
  }

  getCategory(){
    this.categorySelected=localStorage.getItem('categoriaSeleccionada')
    this.categorySelected=JSON.parse(this.categorySelected)
   
  }
}
