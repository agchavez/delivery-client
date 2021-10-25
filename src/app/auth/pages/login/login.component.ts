import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidatorService } from '../../../shared/service/validator.service';
import { AlertType, ColorAlert, NameAlert } from '../../../shared/interfaces/alert.interface';


import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show:boolean = false;
  alert!:AlertType;
  myForm:FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService,
    public dialog        : MatDialog,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  validatorCamp(camp:string){
    return this.myForm.get(camp)?.invalid &&
            this.myForm.get(camp)?.touched;
  }
  login(){
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      this.alert = {
        name: NameAlert.warnig,
        icon: faExclamationCircle,
        msj:"Datos requeridos",
        color: ColorAlert.warnig
      }
      this.dialog.open(AlertComponent,{
        hasBackdrop: false,
        data: this.alert
      });
      return

    }

    //TODO:El usuario no esta registrado
    this.alert = {
      name: NameAlert.info,
      icon: faQuestionCircle,
      msj:"El usuario no existe",
      color: ColorAlert.info
    }
    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });

  }

  showPass(){
    this.show = !this.show
  }
}
