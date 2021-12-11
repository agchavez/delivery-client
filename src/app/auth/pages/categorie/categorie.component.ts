import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Output() onCategorySelected = new EventEmitter();
  
  categories:any=[];
  cant:number=0
  offset:number=0;
  limit:number=4;
  categorySelected:any={}

  constructor(
    private categoriesService  : CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.getCategories('')
    if(localStorage.getItem('categoriaSeleccionada')!=null){
      this.categorySelected=localStorage.getItem('categoriaSeleccionada')
    this.categorySelected=JSON.parse(this.categorySelected)
    }
    

  }

  selected(id:string,name:string,imgUrl:string){
  this.onCategorySelected.emit(id) ;

    //this.catgorySelected=id;
  //console.log('id ',this.catgorySelected)
  localStorage.setItem('categoriaSeleccionada',JSON.stringify({"id":id,"name":name,"urlImg":imgUrl}))
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
    this.offset= this.offset-4

  }
   this.categoriesService.getCategory(this.offset,this.limit).subscribe(
    res=>{
      this.categories=res.categories[0]
      this.cant=res.categories[1]
  console.log("categorias: ",this.categories,this.cant)

    },
    error=>{
      console.log(error)
    }
  );
  }
}
