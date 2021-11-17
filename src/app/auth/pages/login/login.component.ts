import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidatorService } from '../../../shared/service/validator.service';
import { AlertType, ColorAlert, NameAlert } from '../../../shared/interfaces/alert.interface';


import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show:boolean = false;
  laoding:boolean = false;

  alert!:AlertType;
  myForm:FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService,
    public  dialog        : MatDialog,
    private router:Router,
    private auth  : AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  validatorCamp(camp:string){
    return this.myForm.get(camp)?.invalid &&
            this.myForm.get(camp)?.touched;
  }
  login(){
    this.laoding = true;
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      this.alert = {
        name: NameAlert.warnig,
        icon: faExclamationCircle,
        msj:"Datos requeridos",
        color: ColorAlert.warnig
      }
      this.openDialog();
      return

    }
    const {email, password} = this.myForm.value;

    this.auth.login(email, password)
    .subscribe( resp => {
      console.log(resp);

      if (resp.ok === true) {
          //TODO: login exitoso
          this.router.navigate(['/auth/location']);

      }
      else if (resp.verified === false ) {
        //TODO:Correo electronico no verificado
        this.alert = {
          name: NameAlert.info,
          icon: faQuestionCircle,
          msj:"Correo no verificado",
          color: ColorAlert.info
        }
        this.openDialog();
          this.router.navigateByUrl('/auth/verified')
      }
      else{

          //TODO:El usuario no esta registrado
            this.alert = {
              name: NameAlert.error,
              icon: faTimesCircle,
              msj:"Correo o contraseña incorrectos",
              color: ColorAlert.error
            }
            this.openDialog();

        }
      });
  this.laoding = false;
  }
  openDialog(){
    this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      data: this.alert
    });
  }

  showPass(){
    this.show = !this.show
  }
}
