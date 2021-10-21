import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { far  } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

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
    SharedRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    FooterComponent,
    ErrorPageComponent
  ]
})
export class SharedModule {

  constructor(library: FaIconLibrary){
    library.addIconPacks(fas, far, fab);
  }
 }
