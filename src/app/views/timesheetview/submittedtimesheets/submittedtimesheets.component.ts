import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { timesheet } from 'src/Models/Timesheet';
import { AuthService } from 'src/services/auth.service';
import { TimesheetService } from 'src/services/timesheet.service';

@Component({
  selector: 'app-submittedtimesheets',
  templateUrl: './submittedtimesheets.component.html',
  styleUrls: ['./submittedtimesheets.component.scss']
})
export class SubmittedtimesheetsComponent implements OnInit {
   
  timesheets:timesheet[] = [] ; 
  public loading:boolean = false ; 

  constructor(private authservice:AuthService ,  
              private timesheetservice:TimesheetService , 
              public dialogref:MatDialogRef<SubmittedtimesheetsComponent>
              ) { }

  ngOnInit(): void { 
           this.getSubmittedTimesheets();
  }


  getSubmittedTimesheets(){ 
    
    this.loading = true ; 
    this.timesheetservice.getSubmittedTimesheetsbyEmploye(this.authservice.getUserFromCache().id) 
                    .subscribe((resp:any)=>{ 
                         this.timesheets = resp ;  
                         this.loading = false; 
                    },
                    (err)=>{ 
                      console.log(err); 
                      this.loading = false ;
                    } 
                    )

  }

  filter(event:any){
   let value:string = event.target.value ;  
    if(value=="TOUS"){ 
      this.getSubmittedTimesheets();
    }else{ 
      this.getTimehseetsByStatus(value); 
         
    } 

  } 

  getTimehseetsByStatus(status:string){  
       this.loading = true ; 
         this.timesheetservice.getTimesheetsByStatus(this.authservice.getUserFromCache().id,status) 
                   .subscribe((resp:any)=>{ 
                              this.timesheets = resp ;  
                              this.loading = false ; 
                   }
                   ,(err)=>{  

                     this.loading = false ; 
                     console.log(err);
                     
                   }
                   )
  }
 
  voirTimesheet(timesheet:timesheet){ 
    this.dialogref.close({data : timesheet})
  } 

  getDate(date:string):Date{ 
    return new Date(date);
  }
}
