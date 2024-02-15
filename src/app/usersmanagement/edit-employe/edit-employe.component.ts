import { Component, Inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employe } from 'src/Models/Employe';
import { EmployeType } from 'src/Models/EmployeType';
import { notification } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {
  
  public fb:FormGroup; 
  public submitted:boolean = false;   
  public isLoading:boolean = false; 
  public errormessage!:string;  
  public selectedprofileimage!:any;   
  public user!:Employe; 
 

  constructor( 
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<EditEmployeComponent> , 
    public userservice:UserService ,  
    public notification:notification ,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {  
    this.fb = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]], 
      password : ['', [Validators.minLength(6)]], 
      email : ['',[Validators.required,Validators.email]] ,  
      profession : [''] ,  
      typeEmploye : [''], 
      dateembauche : [''],
      nom : ['',[Validators.required]] , 
      prenom : ['',[Validators.required]] , 
      numeroTele : [''] ,
      adresse : [''] 

    }); 

    this.user = this.data.user ;  
    console.log(this.user);
   } 
  


  ngOnInit(): void {   
     
      this.fb.controls['username'].setValue(this.user.username); 
      this.fb.controls['email'].setValue(this.user.email); 
      this.fb.controls['nom'].setValue(this.user.nom);
      this.fb.controls['prenom'].setValue(this.user.prenom);
      this.fb.controls['numeroTele'].setValue(this.user.numeroTele); 
      this.fb.controls['adresse'].setValue(this.user.adresse); 
      this.fb.controls['profession'].setValue(this.user.profession);
      this.fb.controls['dateembauche'].setValue(this.user.dateembauche); 
      this.fb.controls['typeEmploye'].setValue(this.user.typeEmploye);  

  }  

  onUpdateEmploye(){ 
    this.submitted = true;   
    if (this.fb.invalid ) {
      return;  
    }       

    this.isLoading =  true ;   
    this.fb.value.id=this.user.id ; 
    this.userservice.updateEmploye(this.fb.value,this.selectedprofileimage) 
     .subscribe((result:any)=>{  
          if(result.status == 200){  
             this.dialogref.close({data:result.response}) ;  
             this.notification.shownotification("L'employé a bien été modifié","Annuler","SUCCESS")
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
