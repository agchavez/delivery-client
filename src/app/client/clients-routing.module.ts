import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/card/card.component';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[

      {path:'', component: HomeComponent},
      {path:'card', component: CardComponent},
      {path:'setting', component: SettingComponent},

      {path:'**', redirectTo: ''}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
