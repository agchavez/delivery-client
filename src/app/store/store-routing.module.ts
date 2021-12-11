import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { CompanyComponent } from './pages/company/company.component';
import { BuyerComponent } from './pages/buyer/buyer.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[

      {path:'', component: HomeComponent},
      {path:'company/:id', component: CompanyComponent},
      {path:'buyer/:data',component:BuyerComponent},

      {path:'**', redirectTo: 'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
