import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

const routes: Routes = [
  //Cargar sutas de auth
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'store',
    loadChildren: ()=>import('./store/store.module').then(m => m.ClientModule)
  },
  {
    path:'',
    loadChildren: ()=>import('./landing/landing.module').then(m=> m.LandingModule)
  },
  {
    path:'404',
    component: ErrorPageComponent
  },
  {
    path:'**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
