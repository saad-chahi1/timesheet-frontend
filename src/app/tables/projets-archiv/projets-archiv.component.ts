import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { Project } from 'src/Models/Project';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projets-archiv',
  templateUrl: './projets-archiv.component.html',
  styleUrls: ['./projets-archiv.component.scss']
})
export class ProjetsArchivComponent implements OnInit { 

  public page:any = 1 ; 
  public pageSize:any = 10 ;  
  public projects:Project[] = [];

  constructor( 
     private projectService:ProjectService , 
     private dialog:MatDialog ,  
     private notification:notification
  ) { }

  ngOnInit(): void { 

     this.projectService.getArchivedprojects() 
          .subscribe((resp:any) =>{ 
                 this.projects = resp ; 
                 console.log(resp);
          },(err) =>{ 
             console.log(err);
          })
  }  

  onSearchChange(value:string){ 

  }  

  Refresh(){ 
      this.ngOnInit();
  }

  DeleteProject(id:string){ 
       
       
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ;   
      dialogConfig.data = {  
        title : "Confirmation" ,
        message : "Voulez-vous vraiment supprimmr ce projet ?" 
  
      } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){ 
            this.projectService.deleteProject(id) 
               .subscribe((resp:any)=>{ 
                this.projects = this.projects.filter((item)=> item.id != id); 
                this.notification.shownotification("le projet a été supprimé","Annuler","SUCCESS")
               },(err)=>{ 
                 console.log(err);
               })
        } 
      })

  }

}
