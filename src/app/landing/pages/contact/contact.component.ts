import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faCheckCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertType, ColorAlert, NameAlert } from 'src/app/shared/interfaces/alert.interface';
import { ValidatorService } from '../../../shared/service/validator.service';
import { CommentService } from '../../services/comment.service';
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
    private dialog : MatDialog,
    private cs     : CommentService
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

    const {recaptcha, ...data} = this.myForm.value;
    //TODO: Guardar mensaje y limpiar formulario
    this.cs.sendMsj(data)
      .subscribe(resp =>{
        if(resp.ok) {
          this.alert = {
            name: NameAlert.success,
            icon: faCheckCircle,
            msj:"Gracias por enviarnos tus comentarios",
            color: ColorAlert.success
          }

          this.openDialog();
          this.myForm.reset();

        }else{
          this.alert = {
            name: NameAlert.info,
            icon: faQuestionCircle,
            msj:"Error al enviar el comentario",
            color: ColorAlert.info
          }

          this.openDialog();
        }
      })

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
