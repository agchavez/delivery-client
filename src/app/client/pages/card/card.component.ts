import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardService } from '../../../auth/services/cards.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType ,NameAlert, ColorAlert, } from 'src/app/shared/interfaces/alert.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { faExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  idBuyer:any
  cards:any=[]
  numberXX:any
  number:string=''
  titular:string=''
  cvv:number=0
  expires:string=''

  alert!:AlertType;
  constructor(private cardService:CardService,private modalService:NgbModal,public  dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    if(localStorage.getItem('id')!=null){
    this.idBuyer=localStorage.getItem('id')
    this.getCards()
    this.numberXX=this.cards
    }

}

openDialog(){
  this.dialog.open(AlertComponent,{
    hasBackdrop: false,
    data: this.alert
  });
}

    addCardModal(modal:any){
      this.modalService.open(modal,{size:'md'})
    }
    delete(idCard:string){
      this.cardService.deleteCard(idCard).subscribe(
        res=>{
          
         this.cards=[]
         this.getCards()
        },
        error=>{
          console.log(error)
        }
      )
    }
    agregar(){

      const data ={
        "number":this.number,
        "expires":this.expires,
        "buyer":this.idBuyer,
        "cvv":this.number,
        "titular":this.titular
      }
        this.cardService.postCard(data).subscribe(
       res=>{
         
        this.alert = {
          name: NameAlert.success,
          icon: faExclamation,
          msj:"Tarjeta guardada",
          color: ColorAlert.success
        }
        this.openDialog();
        this.modalService.dismissAll()
        this.cards=[]
        this.getCards()
       },
       error=>{
         console.log(error)
       }
     )
    }

    getCards(){
         
      this.cardService.getCards(this.idBuyer).subscribe(
       res=>{
         this.cards=res.cards
     //console.log("cards: ",this.cards)
    
       },
       error=>{
         console.log(error)
       }
     );
     }
}
