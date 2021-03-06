import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { SidevarComponent } from './shared/sidevar/sidevar.component';
import { MaterialModule } from '../material/material.module';
import { CompanyComponent } from './pages/company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuyerComponent } from './pages/buyer/buyer.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    NavBarComponent,
    SidevarComponent,
    CompanyComponent,
    BuyerComponent,
    
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class StoreModule {

}
