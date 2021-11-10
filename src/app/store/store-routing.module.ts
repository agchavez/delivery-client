import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { PorfileCompanyComponent } from './pages/porfile-company/porfile-company.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
     
      {path:'', component: HomeComponent},
      {path:'porfileCompany', component: PorfileCompanyComponent},

      
      {path:'**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
