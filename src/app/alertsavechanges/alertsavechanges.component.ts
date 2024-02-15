import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alertsavechanges',
  templateUrl: './alertsavechanges.component.html',
  styleUrls: ['./alertsavechanges.component.scss']
})
export class AlertsavechangesComponent implements OnInit {
  

  ischecked:boolean = false ;  
  constructor(public dialogref:MatDialogRef<AlertsavechangesComponent>) { }

  ngOnInit(): void {
  } 

  onConfirm(){ 
    if(this.ischecked == true){ 
        localStorage.setItem("talert","true");
    }
    this.dialogref.close(true);
} 

 onDismiss(){ 
    this.dialogref.close(false);
 }

}
