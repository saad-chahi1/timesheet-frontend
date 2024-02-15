import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Affectation } from 'src/Models/Affectation';
import { Employe } from 'src/Models/Employe';
import { Phase } from 'src/Models/Phase';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-add-affec',
  templateUrl: './add-affec.component.html',
  styleUrls: ['./add-affec.component.scss']
})
export class AddAffecComponent implements OnInit {
  
  isLoading:boolean = false ; 
  submitted:boolean = false ;   
  phases:Phase[] = [] 
  equipe:Employe[] = [] ; 

  public fb:FormGroup ; 

  constructor( 
    private formBuilder:FormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private projectservice:ProjectService,  
    private notification:notification,
    public dialogref:MatDialogRef<AddAffecComponent>  
    ) {  
    this.fb = this.formBuilder.group({
      phase : ['', [Validators.required]],  
      descriptionTaches : ['',Validators.required], 
      dateFinPrevue  : ['',Validators.required] , 
      employe : ['' , Validators.required] 
    });  
 
     this.phases = data.phases ;   
     this.equipe = data.equipe ; 
  }

  ngOnInit(): void { 

  }

  get f() {   
    return this.fb.controls ;  
  }     

  onAddSubmit(){   

    this.submitted = true ;  
    
    if(this.fb.invalid){ 
      return;
    }     

    this.isLoading = true ; 

    let affectation:Affectation = Object.assign({},this.fb.value);
    
    affectation.employe = { id : this.fb.value["employe"] } 
    affectation.phase = { id : this.fb.value["phase"] }
  
  this.projectservice.addaffectation(affectation) 
      .subscribe((resp:any)=>{  
            this.isLoading = false ; 
            if(resp.STATUS == 200){  
               this.notification.shownotification("Affectaion a bien été ajoutée , veuillez consulter la liste des affectations","Annuler" ,"SUCCESS");
              this.dialogref.close({data:resp.RESPONSE})
            }else {  
               this.isLoading = false ;
              console.log("interal error")
            }
      }, 
      (err)=>{

      } 
      )


  } 

  Annuler(){  

    this.dialogref.close()

  }


}
