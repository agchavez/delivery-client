import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    ErrorPageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    FooterComponent,
    ErrorPageComponent
  ]
})
export class SharedModule { }
