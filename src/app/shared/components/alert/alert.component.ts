import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AlertType } from '../../interfaces/alert.interface';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
    `
        .email{
          color: var(--colorAlert);
        }
    `
  ],
  styleUrls: ['./alert.component.css'],

})
export class AlertComponent implements OnInit{
  @HostBinding("style.--colorAlert") colorAlert:string = this.alert.color;
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public alert: AlertType
  ) {

  }
  ngOnInit(){
    setTimeout(()=>{this.dialogRef.close();}, 3000);

  }


  close(){
    this.dialogRef.close();
  }

}
