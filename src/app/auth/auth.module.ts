import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { fab } from '@fortawesome/free-brands-svg-icons';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule,FormsModule       } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { VerifiedComponent } from './pages/verified/verified.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { DirectionComponent } from './pages/direction/direction.component';
import { LocationComponent } from './pages/location/location.component';
import { CategorieComponent } from './pages/categorie/categorie.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NavBarComponent,
    VerifiedComponent,
    ForgotComponent,
    DirectionComponent,
    LocationComponent,
    CategorieComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
  ,
  exports: [
    NavBarComponent
  ]
})
export class AuthModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas, far, fab);
  }
}
