import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[

      {path:'', component: HomeComponent},

      {path:'**', redirectTo: 'location'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
