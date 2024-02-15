import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tasksdescription',
  templateUrl: './tasksdescription.component.html',
  styleUrls: ['./tasksdescription.component.scss']
})
export class TasksdescriptionComponent implements OnInit {
   
  description:string = "" ; 
  constructor( @Inject(MAT_DIALOG_DATA) public data:any) {  

    this.description =  data.description ; 
  }

  ngOnInit(): void { 

  }

}
