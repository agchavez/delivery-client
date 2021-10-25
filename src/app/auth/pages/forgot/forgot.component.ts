import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AlertType, ColorAlert, NameAlert } from 'src/app/shared/interfaces/alert.interface';
import { ValidatorService } from '../../../shared/service/validator.service';

import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {


  alertShow:boolean = false;
  alert:AlertType={
    color: ColorAlert.success,
    icon: faCheckCircle,
    name:NameAlert.success,
    msj:"Usuario creado"
  };

  @ViewChild('stepper') stepper!: MatStepper;
  res:string = "hola";
  firstFormGroup: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this._vs.emailPattern)]]
  });
  codeFormGroup: FormGroup = this._formBuilder.group({
    code: ['', [Validators.required, Validators.pattern(this._vs.codePattern)]]
  });

  passFormGroup: FormGroup = this._formBuilder.group({
    password: ['', [ Validators.required, Validators.minLength(6) ]  ],
    password2: ['', [ Validators.required ]  ],
  },{
    validators: [ this._vs.fieldsEqual('password','password2') ]
  });


  lastFormGroup: FormGroup = this._formBuilder.group({
    email: ['', Validators.required]
  });
  last2FormGroup: FormGroup = this._formBuilder.group({
    email: ['', Validators.required]
  });



  constructor(
    private _formBuilder : FormBuilder,
    public dialog        : MatDialog,
    private _vs          : ValidatorService,
    private _router      : Router) {

   }

   ngOnInit(): void {
    window.scroll(0,0);
  }

  sendEmail(){


    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });
    this.firstFormGroup.markAllAsTouched();

    this.alertShow = true;
    if (this.firstFormGroup.invalid) {
      return
    }

    this.lastFormGroup.patchValue({
       email:"email"
    })
    this.stepper.next();
    //this.lastFormGroup.reset();
  }

  verifiedCode(){
    this.codeFormGroup.markAllAsTouched();
    if (this.codeFormGroup.invalid) {
      return
    }
    this.last2FormGroup.patchValue({
       email:"email"
    })
    this.stepper.next();

  }

  changePassword(){

    //TODO: Validar campos
    this._router.navigate(['/auth/login']);
  }


  validateCamp(camp:string, form:FormGroup){
      return form.get(camp)?.invalid
              && form.get(camp)?.touched;
  }


}
