import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimesheetTableFormat } from 'src/Models/TimesheetTableFormat';

@Component({
  selector: 'app-rejectiondetailsview',
  templateUrl: './rejectiondetailsview.component.html',
  styleUrls: ['./rejectiondetailsview.component.scss']
})
export class RejectiondetailsviewComponent implements OnInit { 

  public datatable:TimesheetTableFormat ; 

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data:any 
      
  ) { 

       this.datatable =  data.datatable ; 
   }

  ngOnInit(): void { 
    
  }

}
