import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { TasksdescriptionComponent } from 'src/app/projectdetails/tasksdescription/tasksdescription.component';
import { UpdateAffecComponent } from 'src/app/projectdetails/update-affec/update-affec.component';
import { Affectation } from 'src/Models/Affectation';
import { Employe } from 'src/Models/Employe';
import { Phase } from 'src/Models/Phase';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.scss']
})
export class AffectationsComponent implements OnInit {
  
  @Input() affectations:Affectation[] = [] ;  
  @Input() phases:Phase[] = [] ; 
  @Input() equipe:Employe[] = [] ; 
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @Output() update:EventEmitter<any> = new EventEmitter();  
   public page:any = 1 ; 
   public pageSize:any = 8 ;   
   public searchvalue:string ; 

  constructor(
    private projectservice:ProjectService , 
    private notification:notification , 
    private dialog:MatDialog
  ) { }

  ngOnInit(): void { 

  }

  deleteAffectation(id:string){  
  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimmr cette Affectation?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{  
      if(result == true){ 
        
        this.projectservice.deleteAffectation(id) 
                            .subscribe((resp:any)=>{ 
                                     if(resp.STATUS == 200){ 
                                       this.notification.shownotification("L'affectation a bien été supprimée","Annuler","SUCCESS")
                                       this.delete.emit(id);
                                      }else{ 
                                       console.log("internal error");
                                     }
                            },(err)=>{ 
                              console.log(err)
        })

      } 
    })
  }  
  

  opentaskdescription(description:string){ 
     
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "40vw" ;  
    dialogConfig.data = { description : description } ; 
    const dialogref =  this.dialog.open(TasksdescriptionComponent,dialogConfig)
  } 

  getPhasename(type:string){ 
    return getPhaseTypeByName(type);
} 


  updateAffectation(affectation:Affectation){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;  
    dialogConfig.autoFocus = false ;
    dialogConfig.minWidth = "50vw" ; 
    dialogConfig.maxHeight = "90vh" ;
    dialogConfig.data = { affectation : affectation , equipe : this.equipe , phases : this.phases  }   
    const dialogref =  this.dialog.open(UpdateAffecComponent,dialogConfig)
    dialogref.afterClosed().subscribe((result)=>{  
        if(result){  
            this.update.emit(result.data);
        }
   })

  }
}
