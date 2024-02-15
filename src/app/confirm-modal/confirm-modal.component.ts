import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
   
  title!: string;
  message!: string;

  constructor( 
     public dialogref:MatDialogRef<ConfirmModalComponent> , 
     @Inject(MAT_DIALOG_DATA) public data:ConfirmDialogModel 

  ) {  
     
      this.title = data.title ; 
      this.message = data.message ; 
  }

  ngOnInit(): void {
  } 

  onConfirm(){ 
      this.dialogref.close(true);
  } 

  onDismiss(){ 
      this.dialogref.close(false);
  }

} 
export class  ConfirmDialogModel { 
   title!:string ;
   message!:string ;  
}
