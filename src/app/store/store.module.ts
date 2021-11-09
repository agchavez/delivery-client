import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { SidevarComponent } from './shared/sidevar/sidevar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    NavBarComponent,
    SidevarComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class StoreModule {

}
