import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from '../../../shared/service/validator.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  loading:boolean = false;
  email:string = "agchavez@unah.hn";
  code:FormControl = new FormControl('',[Validators.required, Validators.pattern(this._valServ.codePattern)]);
  durationInSeconds = 5;
  constructor(
    private _snackBar: MatSnackBar,
    private _valServ: ValidatorService
  ) { }

  ngOnInit(): void {
  }

  onVerified(){
    this.code.markAsTouched();
    if (this.code.invalid) {
      return
    }
    this.loading=true;
    setTimeout(()=>{
      this.loading=false;
      this.openSnackBar('Codigo no valido', 'ok')
    }, 2000);


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}

