import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'**',
        redirectTo:'home'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
