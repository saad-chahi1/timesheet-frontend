import { Component, Input, OnInit, Output } from '@angular/core';
import { BREAKPOINT } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Employe } from 'src/Models/Employe';
import { timesheet } from 'src/Models/Timesheet';
import { notification } from 'src/services/notification.service';
import { TimesheetService } from 'src/services/timesheet.service';
import { EventEmitter } from '@angular/core';
import { convertToTableFormat } from '../../timesheetactions';
import { TimesheetComponent } from '../timesheet/timesheet.component';

@Component({
  selector: 'app-timesheetmanagement',
  templateUrl: './timesheetmanagement.component.html',
  styleUrls: ['./timesheetmanagement.component.scss']
})
export class TimesheetmanagementComponent implements OnInit {
  /*
  @Input('timesheetdata') 
  set timesheetdata(timesheetdata:any[]){  
           //track changes 
           this.setloading(); 
           this.data = [] ; 
           this.timesheets = timesheetdata ; 
  }    */

 // @Output() onRefresh:EventEmitter<any> = new EventEmitter();


 setloading(){  
   this.loading = true ; 
   setTimeout(()=> { this.loading = false },2000)
 }

  
  timesheets:timesheet[]  = []; 
  
  public loading:boolean = false ; 
  public loading2:boolean = false ; 
  public data:any[] = [] ; 
  

  constructor( 
              private timesheetservice:TimesheetService , 
              private dialog:MatDialog , 
              public notification:notification
              
              ) {  }

  ngOnInit(): void { 
         this.getTimehseetsByStatus("SUBMITTED"); 
  }  

  refresh(){ 
    this.getTimehseetsByStatus("SUBMITTED");    
    this.data = [] ; 
    this.notification.shownotification("Refreshed","Annuler","SUCCESS")
  }

  checkvalue(i,v,timesheetid){     
    
    let index =  this.data.findIndex((v)=>v.timesheetid == timesheetid);
      if(v.value == "REJECT"){  
        document.getElementById("pl"+i)!.style.visibility = "visible" ; 
        document.getElementById('t'+i)?.focus();   
        if(index < 0){ 
          this.data.push({ timesheetid : timesheetid , status : v.value , comment : "" }); 
        }else{  

          //this.data[index].comment = "" ;   
          this.data[index].status = "REJECT"
        }

      }else{    
        if(index < 0){  
          this.data.push({ timesheetid : timesheetid , status : v.value  })
        }else{ 
          delete(this.data[index].comment); 
          this.data[index].status = "APPROUVE"
        }
         document.getElementById("pl"+i)!.style.visibility = "hidden" ; 
         
      } 
  } 
  
  updateComment(timesheetid,v){  
       let index = this.data.findIndex(v=> v.timesheetid == timesheetid) 
       this.data[index].comment = v.target.value ;  
  }

  hidePopup(i){  
        document.getElementById("pl"+i)!.style.visibility = "hidden"
  } 
  
  openTimesheet(timesheet){  


    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ; 
    dialogConfig.height = "70vh" ; 
    dialogConfig.width = "70vw"

    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
       timesheet : timesheet 
    } 
    const dialogref =  this.dialog.open(TimesheetComponent,dialogConfig); 

  } 
  retrievetimesheet(event){  
    this.getTimehseetsByStatus(event.target.value);

  }

  isatleastchecked(){ 
    return ($('input[type=radio]:checked').length > 0);
  }
  
  sendvalue(){  
      this.data.map((v:any)=>{ 

        if(v.status == "REJECT"){ 
                this.rejecttimesheet(v.timesheetid,v.comment);
        }else if(v.status == "APPROUVE"){ 
                this.approuvetimesheet(v.timesheetid);
         }
      });  

      this.loading2 = true ; 
      
      setTimeout(()=>{ 
            this.loading2 = false ; 
            this.data = []; 
            this.getTimehseetsByStatus("SUBMITTED");
      },3000);

      
  }  

  rejecttimesheet(timesheetid,comment){ 
    this.timesheetservice.rejecttimesheet(timesheetid,comment) 
                         .subscribe((resp:any) => { 
                               if(resp.STATUS == 200){  
                                          
                                          
                               }
                         },(err)=>{  
                          console.log(err)})
  }
 

  approuvetimesheet(timesheetid:string){
    this.timesheetservice.approuvetimesheet(timesheetid) 
               .subscribe((resp:any)=>{ 
                     if(resp.STATUS){ 
                        
                     } 
                    
                  },(err)=>{ 
                     console.log(err); 
                   
                  })
  }

  



  getSubmittedTimesheets(){ 
    
    this.loading = true ; 
    this.timesheetservice.getAllTimesheets() 
                    .subscribe((resp:any)=>{ 
                         this.timesheets = resp ;  
                         this.loading = false ; 
                    }, 
                    (err)=>{ 
                      this.loading = false ; 
                      console.log(err);
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
         this.timesheetservice.getAllTimesheetsByStatus(status) 
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
 /*
  voirTimesheet(timesheet:timesheet){   

    this.dialogref.close({data : timesheet}) 

  } */

  

  getDate(date:string):Date{ 
    return new Date(date);
  }

} 

export const faketimesheets:any[] = [ 
  {   
    id : "test" ,
    dateDebut : "2021-07-26" ,  
    employe : { 
        nom : "Talhi" , 
        prenom : "Mohammed"
    } ,
    status : "SUBMITTED" , 
    dateFin : "2021-07-30"

   }  , 
   {   
    id : "test" ,
    dateDebut : "2021-07-26" ,  
    employe : { 
        nom : "Chetioui" , 
        prenom : "Mohammed"
    } ,
    status : "SUBMITTED" , 
    dateFin : "2021-07-30"

   }  
    
   
]
