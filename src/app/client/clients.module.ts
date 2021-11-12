import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PorfileComponent } from './pages/porfile/porfile.component';
import { CardComponent } from './pages/card/card.component';
import { SettingComponent } from './pages/setting/setting.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    NavBarComponent,
    PorfileComponent,
    CardComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule
  ]
})
export class ClientsModule { }
