import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertType, ColorAlert, NameAlert } from 'src/app/shared/interfaces/alert.interface';
import { ValidatorService } from '../../../shared/service/validator.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  siteKey:string = "6LdixPMcAAAAABlFCtyhekgQ73lSmk-oqVVImO6Y";
  myForm: FormGroup = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3)]],
    lastName:["", [Validators.required,  Validators.minLength(3)]],
    email: ["", [Validators.required,  Validators.pattern(this.vs.emailPattern)]],
    recaptcha: ["", Validators.required],
    msj: ["", [Validators.required, Validators.minLength(20)]]
  })
  alert!:AlertType;

  getErrorMessage() {
  }
  constructor(
    private fb     : FormBuilder,
    private vs     : ValidatorService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  validatorCamp(camp:string){
    return this.myForm.get(camp)?.invalid &&
            this.myForm.get(camp)?.touched;
  }

  send(){
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid){
        this.alert = {
              name: NameAlert.warnig,
              icon: faExclamationCircle,
              msj:"Datos requeridos",
              color: ColorAlert.warnig
            }
        this.openDialog();
        return
    }

    //TODO: Guardar mensaje y limpiar formulario
    this.alert = {
      name: NameAlert.success,
      icon: faCheckCircle,
      msj:"Gracias por tu comentario mensaje",
      color: ColorAlert.success
    }

    this.openDialog();
    this.myForm.reset();
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

openDialog(){
    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });
  }

}
