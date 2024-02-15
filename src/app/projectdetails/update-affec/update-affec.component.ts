import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Affectation } from 'src/Models/Affectation';
import { Employe } from 'src/Models/Employe';
import { Phase } from 'src/Models/Phase';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-update-affec',
  templateUrl: './update-affec.component.html',
  styleUrls: ['./update-affec.component.scss']
})
export class UpdateAffecComponent implements OnInit {
  
  isLoading:boolean = false ; 
  submitted:boolean = false ;   
  phases:Phase[] = [] ; 
  affectation:Affectation ;
  equipe:Employe[] = [] ; 

  public fb:FormGroup ; 

  constructor(
    public dialogref:MatDialogRef<UpdateAffecComponent>, 
    private formBuilder:FormBuilder,  
    private notification:notification,
    private projectservice:ProjectService,
    @Inject(MAT_DIALOG_DATA) public data:any) {   

      this.fb = this.formBuilder.group({
        phase : ['', [Validators.required]],  
        descriptionTaches : ['',Validators.required], 
        dateFinPrevue  : ['',Validators.required] ,  
        status : ['',Validators.required],
        employe : ['' , Validators.required] 
      });  
   
       this.phases = data.phases ;   
       this.equipe = data.equipe ; 
       this.affectation = data.affectation ;  
      
    }

  ngOnInit(): void {  
    this.fb.controls['phase'].patchValue(this.affectation.phase!.id); 
    this.fb.controls['descriptionTaches'].setValue(this.affectation.descriptionTaches); 
    this.fb.controls['dateFinPrevue'].setValue(this.affectation.dateFinPrevue); 
    this.fb.controls['employe'].setValue(this.affectation.employe!.id);
    this.fb.controls['status'].patchValue(this.affectation.status); 
  } 

  get f() {   
    return this.fb.controls ;  
  }      


  onUpdateSubmit(){  

    this.submitted = true ;  
    
    if(this.fb.invalid){ 
      return;
    }    
    
    let affectation:Affectation = Object.assign({},this.fb.value);
    affectation.id = this.affectation.id ; 
    affectation.employe = { id : this.fb.value["employe"] } 
    affectation.phase = { id : this.fb.value["phase"] }
  
     this.projectservice.updateaffectation(this.affectation.id,affectation) 
                        .subscribe((resp:any)=>{ 
                                 if(resp.STATUS == 200){  
                                   console.log(resp.RESPONSE)
                                       this.notification.shownotification("l'Affectation a bien été modifiée","Annuler","SUCCESS")
                                          this.dialogref.close({data:resp.RESPONSE})
                                      }
                        },(err)=>{ 
                          console.log(err)
                        })


  } 

  Annuler(){ 
    this.dialogref.close();
  }

}
