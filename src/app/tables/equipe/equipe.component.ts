import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { EmployeprojectdurationdetailsComponent } from 'src/app/projectdetails/employeprojectdurationdetails/employeprojectdurationdetails.component';
import { Employe } from 'src/Models/Employe';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
   
  @Input() equipe:Employe[] = [] ;   
  @Output() delete:EventEmitter<any> = new EventEmitter(); 
  projectid!:string;  
  public searchvalue:string ; 

  public page:any = 1 ; 
  public pageSize:any = 7 ;   

  constructor(  
     private dialog:MatDialog ,
     private projectservice:ProjectService , 
     private notification:notification,
     private route:ActivatedRoute 

  ) {}

  ngOnInit(): void {  
    this.route.params.subscribe(params => { 
      this.projectid = params.projectid   
    })
  }  


  opendetailsemploye(employeid:string){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "40vw" ; 
    dialogConfig.maxHeight = "60vh" ;
    dialogConfig.data = { employeid : employeid , projectid : this.projectid }  
    const dialogref =  this.dialog.open(EmployeprojectdurationdetailsComponent,dialogConfig)
  }

  removeEmployeFromTeam(employe:Employe){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : `Voulez-vous vraiment retirer ${employe.nom} ${employe.prenom} ?`

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{  
      if(result == true){ 
          this.projectservice.deleteemployeteam(this.projectid,employe.id) 
                .subscribe((resp:any)=>{  
                           //response.status
                         this.delete.emit(employe.id)
                         this.notification.shownotification("L'employé a bien été retiré","Annuler","SUCCESS");
                       
                },(err)=>{ 
                    console.log(err);
                })
      } 
    })
  } 

}
