import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {
  showFiller:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
