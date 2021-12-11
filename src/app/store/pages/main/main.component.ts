import { Component, OnInit, ViewChild } from '@angular/core';
import { CategorieComponent } from 'src/app/auth/pages/categorie/categorie.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('category') categoryComponent!:CategorieComponent;

  constructor() { }

  ngOnInit(): void {
  }


  getCategory(id:any){
console.log(id)
  }

}
