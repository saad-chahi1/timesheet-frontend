import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnyMxRecord } from 'dns';
import * as moment from 'moment';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { Employe } from 'src/Models/Employe';
import { TimesheetTableFormat } from 'src/Models/TimesheetTableFormat';
import { notification } from 'src/services/notification.service';
import { TimesheetService } from 'src/services/timesheet.service';
import { UserService } from 'src/services/user.service';
import { convertToTableFormat } from '../../timesheetactions';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { TimesheetmanagementComponent } from '../timesheetmanagement/timesheetmanagement.component';
import { RaisonrefusComponent } from './raisonrefus/raisonrefus.component';

@Component({
  selector: 'app-timesheetdetails',
  templateUrl: './timesheetdetails.component.html',
  styleUrls: ['./timesheetdetails.component.scss']
})
export class TimesheetdetailsComponent implements OnInit {

  constructor(
       private dialog:MatDialog , 
       private employeservice:UserService ,  
       private timesheetservice:TimesheetService , 
       private notification:notification
       ) { } 
  employes:Employe[] = [];
  selectedCar:number;  
  dateDebut:string = "" ;  
  dateFin:string = "" ;  
  status:string = "" ; 
  selectedemploye:string = "" ;   
  timesheetloading:boolean = false ;  
  changeText:boolean = false ;  
  loading:boolean = false ; 
 
  public weekdata:string[] = [] ;   
  public datatable:TimesheetTableFormat = { data : []} 

  timesheets:any[] = [] ; 

  

  ngOnInit(): void { 
     this.getEmployes(); 
     this.getTimehseetsByStatus("SUBMITTED");  
     this.selectedemploye = 'tous' ; 
     this.status = 'SUBMITTED'

    // this.weekdata = this.getWeekofday(); 
   
  }    

  /*

  prepareData(timesheetdata:any[]){           
      const data:any[] = convertToTableFormat(timesheetdata[0]);      
      let formatedata:any[] = [] ; 

       data.map((timesheet)=>{  
         let timesheetid = timesheet.id ;  
         let index = formatedata.findIndex(t => t.id === timesheetid)
         
       }) 
       
    
    let newdat:any[] = [] 
    resp.map((va)=>{ 
       let phase = va[0]; 
       let index = newdat.findIndex( v => v.phase == phase); 
       if(index >= 0){
            newdat[index].result.push([va[1],va[2],va[3]])    
       }else{  
            newdat.push({phase : phase , result : [[va[1],va[2],va[3]]]})
       }
    }) 
    return newdat ; 

  } */

  isvalid(){ 
    return this.dateDebut.trim() && this.dateFin.trim() && this.selectedemploye.trim() && this.status.trim() ;
  }

  approuve(id:string){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous approuver cette feuille de temps?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{  
      if(result == true){    
        let index = this.timesheets.findIndex((t)=> t.id === id); 
        
    
          this.timesheetservice.approuvetimesheet(id) 
               .subscribe((resp:any)=>{ 
                     if(resp.STATUS){ 
                        // this.datatable.status = "APPROUVED" 
                   
                        this.timesheets[index] = convertToTableFormat(resp.RESPONSE) ;  


                       
                     } 
                      
                  },(err)=>{ 
                     console.log(err); 
                     
                  })
                  
    }});

        
  }  

  canvalid(timesheet){ 
    return timesheet.status === 'SUBMITTED'
  }

  getEmployes(){ 
         this.employeservice.getAllEmployes()
                   .subscribe((resp:any)=>{ 
                        this.processdata(resp); 
                        this.employes = resp ;   
                   } , 
                   (err) => { 
                      console.log(err);
                   }
                   )
  }   

  

  refresh(){ 
    this.getTimehseetsByStatus("SUBMITTED")
     this.selectedemploye = null ;  
     this.notification.shownotification("Refreshed","Annuler","SUCCESS")
     this.dateDebut = '' ; 
     this.dateFin = '' ;   
     this.selectedemploye = 'tous'
     this.status = 'SUBMITTED' ; 
  } 

  
 
  processdata(resp:any){  
    resp.map((e)=> {  
        let fullName:string  = e.prenom[0].toUpperCase()+(e.prenom.substring(1,e.prenom.length)).toLowerCase()+" "+e.nom[0].toUpperCase()+(e.nom.substring(1,e.nom.length)).toLowerCase() ; 
        e.fullName = fullName ; 
    })
   
  } 
  
  getDateObject(date:string){ 
    return new Date(date);
  } 

  

  openSubmittedTimesheets(){ 
       
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "70vw" ;
    dialogConfig.minHeight = "60vh" ;  
    const dialogref =  this.dialog.open(TimesheetmanagementComponent,dialogConfig) 
    dialogref.afterClosed().subscribe((result)=>{ 
      if(result){  
        this.weekdata = this.getWeekofday(result.data.dateDebut); 
        let dateDebut = this.weekdata[0] ;;
        let dateFin = this.weekdata[4];  
        let test =  convertToTableFormat(result.data)
      
  
        this.datatable =  test ;

            
      }}); 
  }  
  getTimehseetsByStatus(status:string){ 
    this.loading = true ; 
    this.timesheetservice.getAllTimesheetsByStatus(status) 
              .subscribe((resp:any)=>{ 
                this.timesheets = this.changealltimesheetstotableformat(resp) ;   
                         this.loading = false ; 
                         
              } 
              ,(err)=>{ 
            
               console.log(err);
              }
              ) 
  }  

  showtimesheet(timesheet){  

     const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ; 
    dialogConfig.height = "70vh" ; 
    dialogConfig.width = "80vw"

    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
       timesheet : timesheet 
    }  

    const dialogref =  this.dialog.open(TimesheetComponent,dialogConfig); 
  }
  
  changealltimesheetstotableformat(data:any[]){ 
       let newdata = [] ; 
       data.map((t) => { 
         newdata.push(convertToTableFormat(t));
       }) 
       return newdata ;
  }
 



  

  searchfortimesheet(){  

     /*  this.weekdata = this.getWeekofday(this.date);
       let dateDebut = this.weekdata[0];
       let dateFin =   this.weekdata[4];  

       this.timesheetloading = true  ; 
     
      this.timesheetservice.getimesheetbyemployeanddates(this.selectedemploye,dateDebut,dateFin) 
      .subscribe((resp:any)=>{   
                if(resp.STATUS == 200){ 
                     this.datatable = convertToTableFormat(resp.RESPONSE) 
                    
                }else { 
                  this.datatable = { data : []} ; 
                } 
                setTimeout(()=>{ this.timesheetloading = false ; },2000)
      },(err)=>{console.log(err)}) */   

    //  console.log(JSON.stringify({ employe : this.selectedemploye , dateDebut : this.dateDebut , dateFin : this.dateFin , status : this.status}))
      

      
      if(this.selectedemploye == "tous"){     
          
         if(this.status == 'tous'){   
         
          this.loading = true , 
          this.timesheetservice.getAllTimesheetsByPeriod(this.dateDebut , this.dateFin) 
          .subscribe((resp:any)=>{ 
        
             this.timesheets = this.changealltimesheetstotableformat(resp) ;
            
             this.loading = false ;  
          },(err)=>{  
             console.log(err);  
             this.loading = false ; 
           }); 

         }else {  
       
          this.loading = true , 
          this.timesheetservice.getAllTimesheetsByPeriodAndStatus(this.dateDebut , this.dateFin , this.status) 
          .subscribe((resp:any)=>{ 
        
             this.timesheets = this.changealltimesheetstotableformat(resp) ;
            
             this.loading = false ;  
          },(err)=>{  
             console.log(err);  
             this.loading = false ; 
           }); 
         }
        

      }else {   

        if(this.status == 'tous'){  
          this.loading = true ; 
          this.timesheetservice.getTimesheetsByEmployeAndDates(this.selectedemploye ,this.dateDebut , this.dateFin) 
          .subscribe((resp:any)=>{ 
            this.timesheets = this.changealltimesheetstotableformat(resp) ;
             this.loading = false ; 
          },(err)=>{ console.log(err);  
                     this.loading = false ; }); 

        }else {
          
          this.loading = true ; 
          this.timesheetservice.getTimesheetsByEmployeAndDatesAndStatus(this.selectedemploye ,this.dateDebut , this.dateFin , this.status) 
          .subscribe((resp:any)=>{ 
            this.timesheets = this.changealltimesheetstotableformat(resp) ;
             this.loading = false ; 
          },(err)=>{ console.log(err);  
                      this.loading = false ; }); 

        }
       
      }

      
           

      //alert(JSON.stringify({ employe : this.selectedemploye , dateDebut : this.dateDebut , dateFin : this.dateFin , status : this.status}))
      
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
    
  reject(id:string){ 

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "50vw" ; 
    dialogConfig.maxHeight = "90vh" ;
  
    const dialogref =  this.dialog.open(RaisonrefusComponent,dialogConfig)
    dialogref.afterClosed().subscribe((result)=>{  
        if(result){    
          let index = this.timesheets.findIndex((t)=> t.id === id); 
       
               
                 this.timesheetservice.rejecttimesheet(id,result.data) 
                         .subscribe((resp:any) => { 
                               if(resp.STATUS == 200){  
                                this.timesheets[index] = convertToTableFormat(resp.RESPONSE) ;
                                             
                                          
                               }
                         },(err)=>{ 
                           this.timesheetloading = false ;  
                          console.log(err)})
        }
   }) 
   

  }  


  getFormatedDate(date:string):string{ 
    let newdate = new Date(date);  
    const monthNames = ["Janvier", "Février", "Mars","Avril" ,"Mai", "Juin", "Juillet",
   "Août", "Septembre", "Octobre", "Novembre", "Décembere"];  

   let day = newdate.getDay(); 
   let month = newdate.getMonth(); 
   let year = newdate.getFullYear(); 
   let p = date.split("-")

       return p[2]+","+monthNames[month]+" "+p[0] ; 

  }

  showDescriptiOnpopup(id:string){    
     console.log(id);
   
     $("#"+id).css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},500);
     document.getElementById('t'+id)?.focus()  
   
    
  }     
 

  hideDescriptionPopup(id:string){  
    $("#"+id).css({visibility:"hidden", opacity: 1.0}).animate({opacity: 0.0},500);
  
  }   




 
  

}
