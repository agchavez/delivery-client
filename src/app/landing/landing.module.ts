import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MainComponent } from './pages/main/main.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    MainComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  exports: [
    FooterComponent
  ]
})
export class LandingModule { }
