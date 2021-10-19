import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm:FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService
  ) { }

  ngOnInit(): void {
  }

  validatorCamp(camp:string){
    return this.myForm.get(camp)?.invalid &&
            this.myForm.get(camp)?.touched;
  }
  login(){

  }
}
