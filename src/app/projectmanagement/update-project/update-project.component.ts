import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/Models/Client';
import { Project } from 'src/Models/Project';
import { ClientService } from 'src/services/client.service';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  
  submitted:boolean = false ;   
  isLoading:boolean = false ; 
  public clients:Client[] = [] ; 
  public project!:Project ; 
  public fb:FormGroup ;

  constructor(  
      private dialogref:MatDialogRef<UpdateProjectComponent>, 
      @Inject(MAT_DIALOG_DATA) public data:any,
      private formBuilder:FormBuilder,
      private clientservice:ClientService, 
      private projectservice:ProjectService,
      private notification:notification
      ) { 

        this.fb = this.formBuilder.group({
          nom: ['', [Validators.required]],  
          client : ['' , [Validators.required]], 
          duree : ['',[Validators.required]] , 
          description : [''] ,  
          dateDebut : [''] ,
          dateFin : [''] , 
          type : [''] , 
          coutestim : [''] , 
          status : ['']
        }); 

        this.project = this.data.project ; 
        
      }  

  ngOnInit(): void {  
    this.clientservice.getClients().subscribe 
    ((resp:any) =>{ 
           this.clients = resp ;   
    }, 
     (err) => { 
           console.log(err);
     }
    )

    this.fb.controls['nom'].setValue(this.project.nom);  
    this.fb.controls['client'].patchValue(this.project.client.id);
    this.fb.controls['description'].setValue(this.project.description);
    this.fb.controls['dateDebut'].setValue(this.project.dateDebut);
    this.fb.controls['dateFin'].setValue(this.project.dateFin);
    this.fb.controls['type'].setValue(this.project.type);
    this.fb.controls['coutestim'].setValue(this.project.coutestim); 
    this.fb.controls['duree'].setValue(this.project.duree);
    this.fb.controls['status'].patchValue(this.project.status);
            
  }   


  get f() {  
    return this.fb.controls ;  
  }  

  onSubmitProject(){ 
    
    

    this.submitted = true;     
    if (this.fb.invalid ) {
      return;  
    }    

    let data = Object.assign({},this.fb.value) 
    data['client'] = {id : this.fb.value.client} 

    this.projectservice.updateproject(this.project.id,data) 
       .subscribe((result)=>{   
         console.log(result)
         this.notification.shownotification("Projet a bien été modifier","Annuler","SUCCESS")
         this.dialogref.close({data:result}) ;  
       },(err)=>{ 
         console.log(err);
       })

    

  } 

  Annuler(){ 
       this.dialogref.close();
  }

}
