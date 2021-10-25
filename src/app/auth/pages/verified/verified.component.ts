import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { AlertType, ColorAlert, NameAlert } from 'src/app/shared/interfaces/alert.interface';
import { ValidatorService } from '../../../shared/service/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  loading:boolean = false;
  email:string = localStorage.getItem("email-verfied")!;
  alert!:AlertType;
  code:FormControl = new FormControl('',[Validators.required, Validators.pattern(this._valServ.codePattern)]);
  durationInSeconds = 5;
  constructor(
    private _valServ   : ValidatorService,
    public  dialog     : MatDialog,
    private router     :Router,
    private auth       : AuthService
  ) { }

  ngOnInit(): void {
  }

  onVerified(){
    this.code.markAsTouched();
    if (this.code.invalid) {
      this.alert = {
        name: NameAlert.warnig,
        icon: faExclamationCircle,
        msj:"Datos requeridos",
        color: ColorAlert.warnig
      }
      this.openDialog();
      return
    }
    this.auth.verifiedCode(this.code.value)
        .subscribe(resp => {
          if (!resp.ok) {

            this.alert = {
              name: NameAlert.error,
              icon: faTimesCircle,
              msj:resp.msj!,
              color: ColorAlert.error
            }
            this.openDialog();
          }else{
            this.alert = {
              name: NameAlert.success,
              icon: faCheckCircle,
              msj:resp.msj!,
              color: ColorAlert.success
            }
            this.openDialog();
            this.router.navigateByUrl('auth');
          }
        }
        );



  }

  openDialog(){
    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });
  }

}

