import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/service/validator.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
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
    private _vs          : ValidatorService,
    private _router      : Router) {
   }

   ngOnInit(): void {
  }

  sendEmail(){
    this.firstFormGroup.markAllAsTouched();
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
    this._router.navigate(['/auth/login']);
  }


  validateCamp(camp:string, form:FormGroup){
      return form.get(camp)?.invalid
              && form.get(camp)?.touched;
  }


}
