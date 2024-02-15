import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-addphase',
  templateUrl: './addphase.component.html',
  styleUrls: ['./addphase.component.scss']
})
export class AddphaseComponent implements OnInit { 

  submitted:boolean = false ;  
  public fb:FormGroup ;  
  public isLoading:boolean = false ;  
  public projectid:string  ; 

  constructor( 
    private formBuilder:FormBuilder ,    
    private projectService:ProjectService ,  
    private notification:notification,
    @Inject(MAT_DIALOG_DATA) public data:any , 
    public dialogref:MatDialogRef<AddphaseComponent>) { 
    this.fb = this.formBuilder.group({
      phaseType: ['', [Validators.required]],  
      duree : ['',[Validators.required]] 
     
    });  

    this.projectid = this.data.projectid ; 
     
   } 

  ngOnInit(): void {

  }  

  

  onAddPhase(){ 
    this.submitted = true ;  
    
    if(this.fb.invalid){ 
      return;
    }  
    this.isLoading = true ; 

    this.projectService.addphasetoproject(this.projectid,this.fb.value) 
               .subscribe((result) =>{  
                 this.isLoading = false ;  
                 this.notification.shownotification("la phase a bien été ajoutée","Annuler","SUCCESS")
                 this.dialogref.close({data:result})
               } ,(err) =>{  
                 this.isLoading = false ;
                 console.log(err);
               })
  }  

  get f() {   
    return this.fb.controls ;  
  }    

  Annuler(){ 
    this.dialogref.close();
  }


}
