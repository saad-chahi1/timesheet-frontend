import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeType } from 'src/Models/EmployeType';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-employe-dialog',
  templateUrl: './add-employe-dialog.component.html',
  styleUrls: ['./add-employe-dialog.component.scss']
})
export class AddEmployeDialogComponent implements OnInit {
  
  public fb:FormGroup; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ; 
  public errormessage!:string ;  
  public selectedprofileimage!:any ;  
 

  constructor( 
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<AddEmployeDialogComponent> , 
    public userservice:UserService
  ) { 
    this.fb = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]], 
      email : ['',[Validators.required,Validators.email]] ,  
      profession : [''] ,  
      typeEmploye : [''], 
      dateembauche : [''],
      nom : ['',[Validators.required]] , 
      prenom : ['',[Validators.required]] , 
      numeroTele : [''] ,
      adresse : [''] 

    });
   }  

   ngOnInit(): void { 

  }

   onAddEmploye(){  
  
    
    this.submitted = true;   
    if (this.fb.invalid ) {
      return;  
    }       

    this.fb.value["typeEmploye"] = EmployeType[this.fb.value["typeEmploye"]] ; 

    this.isLoading = true ;    
    this.dialogref.disableClose = true ;
    this.userservice.addEmploye(this.fb.value,this.selectedprofileimage) 
             .subscribe((result:any)=>{ 
                this.isLoading = false ;  
                  if(result.status == "400"){ 
                    this.errormessage = result.response ;  
                    this.isLoading = false  ; 
                  }else if( result.status == "200"){  
                    this.dialogref.close({data:result.response})
                  }
                  
             } ,(err) => {   
               this.isLoading = false ; 
               console.log("Internal sendResetEmailerver")} 
             
             )

   } 

 
  Annuler(){  
    this.dialogref.close();
  } 

  get f() {  
    return this.fb.controls ;  
  }  
  

  public onImageChanged(event:any) {
    this.selectedprofileimage = event.target.files[0];
  }

}
