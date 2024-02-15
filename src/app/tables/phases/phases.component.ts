import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { UpdatephaseComponent } from 'src/app/projectdetails/updatephase/updatephase.component';
import { Phase } from 'src/Models/Phase';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
   
  @Input()
  public Phases:Phase[] = [];    
  public loading:boolean = false ; 
  public page:any = 1 ; 
  public pageSize:any = 5 ;   
  public searchvalue:String ; 
  

  @Output() delete:EventEmitter<any> = new EventEmitter(); 

  constructor( 
    private dialog:MatDialog , 
    private projectservice:ProjectService , 
    private notification:notification
  ) { }

  ngOnInit(): void { 

   
  }  

  getPhasename(type:string){ 
      return getPhaseTypeByName(type);
  } 

  deletePhase(id:string){ 
      
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ;   
      dialogConfig.data = {  
        title : "Confirmation" ,
        message : "Voulez-vous vraiment supprimmer cette phase ?" 
  
      } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){  

            
            this.projectservice.deletePhaseProject(id) 
               .subscribe((resp:any)=>{   
               
                 if(resp.STATUS === 200){ 
                    
                  this.delete.emit(id);
                  this.notification.shownotification("la phase a été supprimée","Annuler","SUCCESS")
                 
                }
              
               },(err)=>{ 
                 console.log(err);
               }) 
              
        } 
      })
  
  }  

  getPercent(values:string[] , duree:number ){ 
    
    if(values == null ){ 
      return 0.00 ; 
    } 

    if(duree == null){ 
      return 0 ; 
    }

    let sum = "00:00" ; 
    values.map((v)=>{ 
        sum = this.addTimes(sum,v)
    }) 
  
    let converted =  this.convert(sum);  

    if(converted>duree){ 
      return 100 ; 
    }

    let result = (converted/duree)*100 ; 
     if(isNaN(result)){ 
         return 0 ; 
     }else{ 
         return  result.toFixed(2) ;     
     }

  } 

  convert(conso:string){ 
    var arr:any =conso.split(':');
    let result = parseInt(arr[0]) + "." + parseInt(arr[1]); 
    let c = parseFloat(result); 
    return c ;
}

  


  updatePhase(phase:Phase){  
      
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "50vw" ; 
    dialogConfig.maxHeight = "90vh" ;
    dialogConfig.data = { phase : phase }  
    const dialogref =  this.dialog.open(UpdatephaseComponent,dialogConfig)
    dialogref.afterClosed().subscribe((result)=>{  
        if(result){  
          const index = this.Phases.findIndex((obj)=>obj.id == phase.id)
          this.Phases[index] = result.data 
        }
   })

  } 
         
          
       
         
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
  

         getEcart(phase:Phase):number{  
          if(phase['consomme'] == null ){ 
             
               return phase.duree ; 
          } 
           let sum = "00:00" ; 
           phase['consomme'].map((v)=>{ 
               sum = this.addTimes(sum,v)
           }) 
  
           let converted =  this.convert(sum);  

           
   
           return  parseFloat(( phase.duree -  converted ).toFixed(2));      
         } 

         


}
