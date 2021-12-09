import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidatorService } from '../../../shared/service/validator.service';
import { AlertType, ColorAlert, NameAlert } from '../../../shared/interfaces/alert.interface';


import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  show:boolean = false;
  laoding:boolean = false;
  alert!:AlertType;
  myForm:FormGroup = this.fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    phone: ['',[Validators.required, Validators.minLength(8)]],
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService,
    public  dialog        : MatDialog,
    private router:Router,
    private clients  : ClientsService
  ) { 
    
  }

  ngOnInit(): void {
    window.scroll(0,0);
    
  
  }

  validatorCamp(camp:string){
    return this.myForm.get(camp)?.invalid &&
            this.myForm.get(camp)?.touched;
  }
  register(){
    
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

    const {firstName,lastName,phone,email,password} = this.myForm.value;
   
    this.clients.registerClient(email,firstName,lastName,phone,password).subscribe(resp=>{
      if(resp.ok){
        this.alert = {
          name: NameAlert.success,
          icon: faCheckCircle,
          msj:"Usuario registrado",
          color: ColorAlert.success
        }
        this.openDialog();
        this.router.navigateByUrl('/auth/verified')

      }else{
        this.alert = {
          name: NameAlert.error,
          icon: faTimesCircle,
          msj:"El correo ya está registrado",
          color: ColorAlert.error

        }
        this.openDialog();

      }
      
    })
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


