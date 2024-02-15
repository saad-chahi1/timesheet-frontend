import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-manager-dialog',
  templateUrl: './add-manager-dialog.component.html',
  styleUrls: ['./add-manager-dialog.component.scss']
})
export class AddManagerDialogComponent implements OnInit {
  
  public fb:FormGroup; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ; 
  public errormessage!:string ;  
  public selectedprofileimage!:any ; 

  constructor( 
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<AddManagerDialogComponent> , 
    public userservice:UserService
  ) {  
    this.fb = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]],
      email : ['',[Validators.required,Validators.email]] , 
      nom : ['',[Validators.required]] , 
      prenom : ['',[Validators.required]] , 
      numeroTele : [''] ,
      adresse : ['']  
    });
     
   }

  ngOnInit(): void {
  } 

  get f() {  
    return this.fb.controls ;  
  }  

  public onImageChanged(event:any) {
    this.selectedprofileimage = event.target.files[0];
  }


  onAddManager(){   

    this.submitted = true;   
    if (this.fb.invalid ) {
      return;  
    }    
    this.isLoading = true ;    
    this.dialogref.disableClose = true ;
    this.userservice.addManager(this.fb.value,this.selectedprofileimage) 
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


}
