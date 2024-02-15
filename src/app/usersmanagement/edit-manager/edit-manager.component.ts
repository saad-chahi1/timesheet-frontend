import { Component, Inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Manager } from 'src/Models/Manager';
import { User } from 'src/Models/User';
import { notification } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.scss']
})
export class EditManagerComponent implements OnInit {

  public fb:FormGroup; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ; 
  public errormessage!:string ;  
  public selectedprofileimage!:any ;   
  public user:Manager ; 


  constructor(
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<EditManagerComponent> , 
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
    this.userservice.updatemanager(this.fb.value,this.selectedprofileimage) 
     .subscribe((result:any)=>{  
          if(result.status == 200){  
             this.dialogref.close({data:result.response}) ;  
             this.notification.shownotification("Le gestionnaire a bien été modifié","Annuler","SUCCESS")
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
