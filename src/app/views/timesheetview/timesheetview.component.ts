import { ChangeDetectorRef, Component, ElementRef, HostListener, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { Phase } from 'src/Models/Phase';
import { TimesheetStatus } from 'src/Models/TimesheetStatus';
import { TimesheetTableFormat } from 'src/Models/TimesheetTableFormat';
import { AuthService } from 'src/services/auth.service';
import { notification } from 'src/services/notification.service';
import { TimesheetService } from 'src/services/timesheet.service';
import { ClientprojectphaseviewComponent } from '../clientprojectphaseview/clientprojectphaseview.component';
import { RejectiondetailsviewComponent } from '../rejectiondetailsview/rejectiondetailsview.component';
import { convertToTableFormat } from '../timesheetactions'; 
import { convertToApiFormat } from '../timesheetactions' ; 
import { AddphasetimesheetComponent } from './addphasetimesheet/addphasetimesheet.component';
import { SubmittedtimesheetsComponent } from './submittedtimesheets/submittedtimesheets.component';
import { TimesheetprintviewComponent } from './timesheetprintview/timesheetprintview.component';
import { UpdatephasetimesheetComponent } from './updatephasetimesheet/updatephasetimesheet.component';



@Component({
  selector: 'app-timesheetview',
  templateUrl: './timesheetview.component.html',
  styleUrls: ['./timesheetview.component.scss']
}) 

export class TimesheetviewComponent implements OnInit{ 

  public timer:string = "00:00" ;  
  public data :any ;      
  public defaultdatevalue = moment().format('YYYY-MM-DD')
  public weekdata:string[] = [] ;   
  public timesheetdata:any; 
  public saving:boolean = false;  
  public submiting:boolean = false ;  
  public timesheetloading:boolean = false ; 
  interval:any;
  public table:any[]= []; 
  public datatable:TimesheetTableFormat = { data : []}

  
  
  public phaseprojectcomps = ClientprojectphaseviewComponent ;  

  @ViewChildren('divdesc') descriptionsdiv:QueryList<ElementRef> ;  


  constructor(private dialog:MatDialog ,  
              private timesheetservice:TimesheetService , 
              private authservice:AuthService , 
              private notification:notification , 
              private router:Router , 
           
              ) {    
               
               
              } 
                       

  ngOnInit(): void {  
   this.weekdata = this.getWeekofday();  
      let dateDebut = this.weekdata[0] ;
      let dateFin = this.weekdata[4]; 
      
      this.getTimesheetByDates(dateDebut,dateFin);   

      if(!window.NodeList.prototype){ 
        window.NodeList.prototype.forEach(z => { 
          console.log(z)
       })
      }
     
      
    
  }       

  @HostListener('document:click', ['$event'])
  clickout(event) { 
  if(this.descriptionsdiv != null){    
      this.descriptionsdiv.forEach((val:ElementRef)=>{ 
        if( val.nativeElement.contains(event.target)) { 
         
        } else {  
          
          
          if(event.target.id != 'i'+val.nativeElement.id ){  
            //document.getElementById(val.nativeElement.id)!.style.visibility = "hidden" ; 
            $("#"+val.nativeElement.id).css({visibility:"hidden", opacity: 1.0}).animate({opacity: 0.0},500);
          } 
          
        }
      });
    /*
    if( this.descriptionsdiv.nativeElement.contains(event.target)) { 
        
    } else { 
      
      if(event.target.id != 'i'+this.descriptionsdiv.nativeElement.id ){ 
        document.getElementById(this.descriptionsdiv.nativeElement.id)!.style.visibility = "hidden" ;
      }
      
    }*/ 
  }
  }

  
  
  
  isBeforeCurentDate(date:string):boolean{ 
         return moment(date).isBefore(new Date());
  }

  alert(){  

    if(this.datatable.status == 'SUBMITTED'){ 
       this.notification.showsubmittednotificationalert();
    }  

    if(this.datatable.status == 'APPROUVED') { 
       
       this.notification.shownotification("Modification non autorisée car la feuille a été approuvée , veuillez selectionner une autre période","Annuler","SUCCESS")
    }

  }

  getDateObject(date:string){ 
   return new Date(date);
  } 

  getPhaseName(phase:string){ 
    return getPhaseTypeByName(phase);
 }
  
  

 getTimesheetByDates(dateDebut:string,dateFin:string){   
      this.timesheetloading = true ;  

        this.timesheetservice.getimesheetbyemployeanddates(this.authservice.getUserFromCache().id,dateDebut,dateFin) 
      .subscribe((resp:any)=>{  
    
                if(resp.STATUS == 200){ 
                  this.timesheetloading = false ; 
                     this.datatable = convertToTableFormat(resp.RESPONSE) 
                     
                }else {  
                  this.timesheetloading = false ; 
                  this.datatable = { data : []} ; 
                }
      },(err)=>{ 
        this.timesheetloading = false ; 
        console.log(err)}) 

      }
  


  

  onDateChange(event:any){ 
     let date = event.target.value; 
     this.weekdata = this.getWeekofday(date); 
     let dateDebut = this.weekdata[0] ;
     let dateFin = this.weekdata[4];
     this.getTimesheetByDates(dateDebut,dateFin)
  }  
 
  //get week dates from current day or from a given day
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
  //
 
  startimer(){ 
    this.interval = setInterval(() => { 
    
    this.timer = this.addTimes(this.timer,"00:01");
    },1000)
  }   

  resettimer(){ 
   this.timer = "00:00" ; 
  } 

  pauseTimer(){ 
   clearInterval(this.interval);
  } 
      
  AjouterLigne(){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "60vw" ;
    dialogConfig.maxHeight = "90vh" ;  
 
  
    const dialogref =  this.dialog.open(AddphasetimesheetComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){    
            let phase:Phase = result.data ;   
             
            if(this.isphaseexistintable(phase) == true){ 
                      this.notification.shownotification("Cette phase existe déjà dans la feuille","Annuler","SUCCESS")
            }else{
             
            this.datatable.data!.push({'phase' : phase , week : [  
              {  date :  this.weekdata[0]  , duration : "" , description : ""} , 
              {  date :  this.weekdata[1]  , duration : "" , description : ""}  , 
              {  date :  this.weekdata[2]  , duration : "" , description : ""}  , 
              {  date :  this.weekdata[3]  , duration : "" , description : ""}  , 
              {  date :  this.weekdata[4]  , duration : "" , description : ""}   
             ]}); 
            }     
          }    
    })

  }   

  isphaseexistintable(phase:Phase){  

      let index =  this.datatable.data.findIndex( p => p.phase.id == phase.id); 
  
      if(index < 0) { 
         return false ; 
      }else { 
         return true ;
      }
  }

  DeleteRow(id:string){    
    const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ;   
      dialogConfig.data = {  
        title : "Confirmation" ,
        message : "Voulez-vous vraiment supprimer cette ligne ?" 
  
      } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){   
          this.datatable.data = this.datatable.data!.filter( e =>  e.phase != id );;
      }});

   
  }   

  UpdatePhase(t:any){   

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ;  
    dialogConfig.data = { phase : t.phase} 

   
    const dialogref =  this.dialog.open(UpdatephasetimesheetComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){    
            let phase:Phase = result.data ; 
            if(this.isphaseexistintable(phase) == true){ 
              this.notification.shownotification("Cette phase existe déjà dans la feuille","Annuler","SUCCESS") 
            }else { 
              let index = this.datatable.data.findIndex((p) => p.phase.id == t.phase.id)
              this.datatable.data[index].phase = result.data ; 
            }  
           
             
          }    
    })

  }  

  showDescriptiOnpopup(id:string){   
    //document.getElementById(id)!.style.visibility = "visible" ;   
    $("#"+id).css({visibility:"visible", opacity: 0.0}).animate({opacity: 1.0},500);
   // document.getElementById('t'+id)?.focus() 
  }     

 

  hideDescriptionPopup(id:string){  
    
    document.getElementById(id)!.style.visibility = "hidden" ;
  } 
  //updateligne 

  //sumduration

  addTimes (startTime:any, endTime:any) {
    var times = [ 0, 0]
    var max = times.length
  
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
  
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    } 
   
  
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
  
    var hours = times[0]
    var minutes = times[1]

    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
  
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  } 

  //
  
  getTotalTimesheetDuration(){  
    let count:string = "00:00"
    this.datatable.data!.filter((t) => { 
         t.week.filter((d:any)=>{ 
             count = this.addTimes(count,d.duration);
         })
    }) 

    return count ; 
  } 

  savetimesheet(){  

         this.datatable.dateDebut= this.weekdata[0] ; 
         this.datatable.dateFin = this.weekdata[4];  
         this.datatable.totalduration = this.getTotalTimesheetDuration();
         this.saving = true ;  
         
    this.timesheetservice.saveupdatetimesheet(convertToApiFormat(this.datatable),this.authservice.getUserFromCache().id) 
           .subscribe((resp:any) => {  
                
                    this.datatable = convertToTableFormat(resp) ;  
                    this.notification.shownotification("Votre feuille de temps a bien été entregistrée","Annuler","SUCCESS")
                    this.saving = false ; 
                   
              } , (err) =>{ 
               
                    this.saving = false ; 
                    console.log(err);
           } 
           ) 
     
  } 

  submittimesheet(){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment soumettre cette feuille de temps ? Attention : vous ne pourrez plus la modifier aprés la soumission " 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{  
      if(result == true){   

        this.submiting = true ; 
        this.timesheetservice.submittimesheet(this.authservice.getUserFromCache().id,this.datatable.id!) 
        .subscribe((resp)=>{ 
                   this.datatable.status = "SUBMITTED"  
                   setTimeout(()=>{ 
                    this.submiting = false ; 
                   },1000)
                   this.notification.shownotification("Votre feuille de temps a bien été soumise","Annuler","SUCCESS")
        },(err)=>{  
          this.submiting = false ; 
          console.log(err);
        })
       
    }}); 
   
   



  }  

  rejectiondetails(){  
     
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = false ;    
      dialogConfig.minWidth = "50vw" ;
      dialogConfig.minHeight = "30vh" ;  
      dialogConfig.data = { datatable : this.datatable }
      const dialogref =  this.dialog.open(RejectiondetailsviewComponent,dialogConfig)

  } 
  openSubmittedTimesheets(){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "70vw" ;
    dialogConfig.minHeight = "60vh" ;  
    const dialogref =  this.dialog.open(SubmittedtimesheetsComponent,dialogConfig) 
    dialogref.afterClosed().subscribe((result)=>{ 
      if(result){  
        this.weekdata = this.getWeekofday(result.data.dateDebut); 
        let dateDebut = this.weekdata[0] ;
        let dateFin = this.weekdata[4];
        this.getTimesheetByDates(dateDebut,dateFin)
            
      }});  

  }



  isTimesheetSubmittable():boolean {  

     if(this.datatable.status == "SAVED" || this.datatable.status == "REJECTED"){ 
        return true ; 
     }else { 
        return  false ; 
     }
  } 

  isTimesheetSubmitted():boolean { 
    if(this.datatable.status == "SUBMITTED"){ 
       return true ; 
    }else { 
      return false ; 
    }
  } 

  openprintview(){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "80vw" ;
    dialogConfig.maxHeight = "90vh" ;  
    dialogConfig.data = { datatable : this.datatable , weekdata :  this.weekdata }
    const dialogref =  this.dialog.open(TimesheetprintviewComponent,dialogConfig)
  }


}
