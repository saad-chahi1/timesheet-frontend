import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { TimesheetTableFormat } from 'src/Models/TimesheetTableFormat';
import { convertToTableFormat } from '../../timesheetactions';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit { 
/*
  @Input() data:any ;     
  
  @Input() timesheets:any[] ; */

  public datatable:TimesheetTableFormat = { data : []}

  constructor(public dialogref:MatDialogRef<TimesheetComponent> ,  @Inject(MAT_DIALOG_DATA) public dataa:any) { 
      
   } 

  public weekdata:string[] = [] ;   
 

  ngOnInit(): void {   

    this.datatable = this.dataa.timesheet;
    this.weekdata = this.getWeekofday(); 
  }  

  getWeekofday(daysa?:string){     
    var currentDate ; 
    if(daysa == null){ 
       currentDate = moment();
    }else{  
       currentDate = moment(daysa);

    }
    var weekStart = currentDate.clone().startOf('isoWeek');
    var weekEnd = currentDate.clone().endOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 4; i++) {
     days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
    } 

    return days ; 
}  

getPhaseName(phase:string){ 
 return getPhaseTypeByName(phase);
}

  getDateObject(date:string){ 
    return new Date(date);
  }  

  showDescriptiOnpopup(id:string){    
    //document.getElementById(id)!.style.visibility = "visible" ;  
    console.log(id); 
    $("#t"+id).css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},500);
    document.getElementById('t'+id)?.focus()  
  
   
 }     


 hideDescriptionPopup(id:string){  
   $("#t"+id).css({visibility:"hidden", opacity: 1.0}).animate({opacity: 0.0},500);
 
 }    

 getDateTime(datetime:string){ 
    let t = datetime.split("\\s+"); 
   
    return  { "date" : new Date(t[0]) , "time" : t[1] }
 }


}
