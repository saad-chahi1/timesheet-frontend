import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-raisonrefus',
  templateUrl: './raisonrefus.component.html',
  styleUrls: ['./raisonrefus.component.scss']
})
export class RaisonrefusComponent implements OnInit { 

  raison:string = "" ;

  constructor(public dialogref:MatDialogRef<RaisonrefusComponent>) { }

  ngOnInit(): void { 

  } 

  envoyer(){ 
    this.dialogref.close({data:this.raison}); 
  }

  Annuler(){ 
          this.dialogref.close();
  } 
  

}
