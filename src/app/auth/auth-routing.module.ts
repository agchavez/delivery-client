import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { VerifiedComponent } from './pages/verified/verified.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ValidateEmailGuard } from '../guards/validate-email.guard';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { LocationComponent } from './pages/location/location.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {path:'login', component:LoginComponent},
      {path:'register', component: RegisterComponent},
      {
        path:'verified',
        component: VerifiedComponent,
        canActivate: [ValidateEmailGuard],
      },
      {path:'forgot-password', component: ForgotComponent},
      {path:'categorie', component: CategorieComponent},
      {path:'location', component: LocationComponent},

      {path:'**', redirectTo: 'login'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
