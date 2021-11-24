import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories:any=[];
  cant:number=0
  offset:number=0;
  limit:number=4

  constructor(
    private categoriesService  : CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.getCategories('')
  }

  getCategories(position:string){
    console.log(this.offset)
  console.log(this.limit)

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
