import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { notification } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit { 

  public fb:FormGroup; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ; 
  public errormessage!:string ;  
  public selectedprofileimage!:any ;  
  public type:string = "" ;  
  public user:User ; 


  constructor(
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<AdminprofileComponent> , 
    public userservice:UserService ,  
    public notification:notification ,
    @Inject(MAT_DIALOG_DATA) public data:any 
  ) {  
    this.fb = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]], 
      password : ['', [Validators.minLength(6)]], 
      email : ['',[Validators.required,Validators.email]] , 
      nom : ['',[Validators.required]] , 
      prenom : ['',[Validators.required]] , 
      numeroTele : [''] ,
      adresse : [''] 

    });  
     this.type = data.type ; 
     this.user = data.user ;   
     
  }

  ngOnInit(): void { 
     
      this.fb.controls['username'].setValue(this.user.username); 
      this.fb.controls['email'].setValue(this.user.email); 
      this.fb.controls['nom'].setValue(this.user.nom);
      this.fb.controls['prenom'].setValue(this.user.prenom);
      this.fb.controls['numeroTele'].setValue(this.user.numeroTele); 
      this.fb.controls['adresse'].setValue(this.user.adresse);
  } 

  onSubmit(){  

    this.submitted = true;   
    if (this.fb.invalid ) {
      return;  
    }  
        
    this.isLoading =  true ;   
    this.fb.value.id=this.user.id ; 
    this.userservice.updateAdmin(this.fb.value,this.selectedprofileimage) 
     .subscribe((result:any)=>{  
          if(result.status == 200){  
             this.dialogref.close({data:result.response}) ;  
             this.notification.shownotification("L'utilisateur a bien été modifié","annuler","SUCESS")
          }else if(result.status == 400){ 
             this.errormessage = result.response ; 
             this.isLoading = false ; 
          }
          
     },
     (error)=>{ 
            console.log(error); 
            this.isLoading = false ; 
     })
    ;

 
  } 
  get f() {  
    return this.fb.controls;  
  }  

  public onImageChanged(event:any) {
    this.selectedprofileimage = event.target.files[0];
  } 

  Annuler(){  
    this.dialogref.close();
}


}
