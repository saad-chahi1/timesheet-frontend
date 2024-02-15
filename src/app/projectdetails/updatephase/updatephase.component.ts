import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Phase } from 'src/Models/Phase';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-updatephase',
  templateUrl: './updatephase.component.html',
  styleUrls: ['./updatephase.component.scss']
})
export class UpdatephaseComponent implements OnInit { 

  submitted:boolean = false ;  
  public fb:FormGroup ;  
  public isLoading:boolean = false ; 
  public phase:Phase ; 

  constructor( @Inject(MAT_DIALOG_DATA) public data:any , 
               private formBuilder:FormBuilder ,  
               private notification:notification , 
               private projectservice:ProjectService , 
               public dialogref:MatDialogRef<UpdatephaseComponent>
  ) {   
      this.fb = this.formBuilder.group({
      duree : ['',[Validators.required]] ,
 
    });  
      this.phase = this.data.phase ;  
  }

  ngOnInit(): void {   
 
   /* this.fb.controls['phaseType'].setValue(this.phase.phaseType);   */
    this.fb.controls['duree'].setValue(this.phase.duree); 
  /*  this.fb.controls['dateDebut'].setValue(this.phase.dateDebut);
    this.fb.controls['dateFin'].setValue(this.phase.dateFin); */
  }  

  get f() {   
    return this.fb.controls ;  
  }    

  Annuler(){ 
    this.dialogref.close();
  } 
  onUpdatePhase(){  
    this.submitted = true ;  
    
    if(this.fb.invalid){ 
      return;
    }    
       this.isLoading = true ;  
     
    this.projectservice.updatephaseproject(this.phase.id,this.fb.value) 
            .subscribe((result:any)=>{ 
                         if(result.status == 200){ 
                          this.notification.shownotification("la phase a bien été modifier","Annuler","SUCCESS")
                          this.dialogref.close({data:result.resp}) ;
                         }          
                         this.isLoading = false ;              
            },(err)=> { 
                console.log(err); 
                this.isLoading = false ; 
            }) 
  }



}
