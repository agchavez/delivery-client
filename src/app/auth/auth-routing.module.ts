import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { VerifiedComponent } from './pages/verified/verified.component';
import { ForgotComponent } from './pages/forgot/forgot.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {path:'login', component:LoginComponent},
      {path:'register', component: RegisterComponent},
      {path:'verified', component: VerifiedComponent},
      {path:'forgot-password', component: ForgotComponent},
      {path:'**', redirectTo: 'login'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
