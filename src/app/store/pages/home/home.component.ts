import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/auth/services/categories.service';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:any=[];
  cant:number=0
  offset:number=0;
  limit:number=3;
  categorySelected:any;
  positionCat:string='';
  companies:any=[]

  constructor(
    private categoriesService  : CategoriesService, private companiesService:CompaniesService
  ) {
    
   }

  ngOnInit(): void {
    this.getCategorySelected()
    this.getCategories('')
    this.getCompanies()

    
  }

  selected(id:string,name:string,imgUrl:string){

    localStorage.setItem('categoriaSeleccionada',JSON.stringify({"id":id,"name":name,"urlImg":imgUrl}))
    this.getCategorySelected()

    this.getCategories('')
    this.getCompanies()

    }

  getCategorySelected(){
    this.categorySelected=localStorage.getItem('categoriaSeleccionada')
    this.categorySelected=JSON.parse(this.categorySelected)
  }

  getCategories(position:string){
    if(position=='rigth'){
      this.offset=this.limit 
      this.limit+=this.limit 
    }
    else if(position=='left'){
      this.limit=this.limit-this.offset
      this.offset= this.offset-3
  
    }
     this.categoriesService.getCategory(this.offset,this.limit).subscribe(
      res=>{
        this.categories=res.categories[0]
        this.getPositionArrayCat()

        this.cant=res.categories[1]
    console.log("categorias: ",this.categories,this.cant)
  
      },
      error=>{
        console.log(error)
      }
    );
    }

  getPositionArrayCat(){  
  
      for(let i in this.categories){
         if(this.categories[i]._id==this.categorySelected){
             this.positionCat = i
         }
      }

      console.log('pos: ',this.positionCat)

    }


  getCompanies(){
    console.log(this.categorySelected.id)
      this.companiesService.getCompaniesByCat(this.categorySelected.id).subscribe(
        res=>{
          if(res.companies[0]!=null){
            this.companies=res.companies[0].empresas
          }
          else{
            this.companies=[]
          }
         // console.log(this.companies)
        },
        error=>{
          console.log(error)
        }
      )

    }
    
    
}

