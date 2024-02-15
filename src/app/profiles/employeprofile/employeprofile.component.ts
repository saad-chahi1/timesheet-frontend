import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MustMatch } from 'src/app/helpers/mustmutch';
import { Employe } from 'src/Models/Employe';
import { AuthService } from 'src/services/auth.service';
import { notification } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-employeprofile',
  templateUrl: './employeprofile.component.html',
  styleUrls: ['./employeprofile.component.scss']
})
export class EmployeprofileComponent implements OnInit {
  
  public active:any = 1 ; 
  public isLoading:boolean = false;  
  public fb1:FormGroup; 
  public fb2:FormGroup; 
  public submitted:boolean = false; 
  public errormessage!:string ;  
  public errormessagePassword:string=""; 
  public  employe!:Employe  ; 
  public submittedprime = false ;
 
  constructor(private formBuilder:FormBuilder ,  
              private authservice:AuthService ,  
              private userservice:UserService , 
              private notification:notification , 
              public dialogref:MatDialogRef<EmployeprofileComponent> , 
              @Inject(MAT_DIALOG_DATA) public data:any
              ) { 
     
    this.fb1 = this.formBuilder.group({
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

    this.fb2 = this.formBuilder.group({
     
      password : ['', [Validators.required]], 
      newpassword : ['' , [Validators.required,Validators.minLength(8)]] , 
      confirmpassword :  ['' , [Validators.required]] , 

    
    } ,  
    
     { 
      validator: MustMatch('newpassword', 'confirmpassword')
    })
      
     this.active = data.active ; 
      
   }

  ngOnInit(): void {  

    this.authservice.getCurrentUser() 
         .subscribe((resp:any)=>{ 
                this.employe = resp ;  
                this.setData();
               
         } , (err)=> { 
             console.log(err);
         }) 

             

  }  


  setData(){ 

    this.fb1.controls['username'].setValue(this.employe.username); 
    this.fb1.controls['email'].setValue(this.employe.email);
    this.fb1.controls['profession'].setValue(this.employe.profession);
    this.fb1.controls['typeEmploye'].setValue(this.employe.typeEmploye); 
    this.fb1.controls['nom'].setValue(this.employe.nom); 
    this.fb1.controls['prenom'].setValue(this.employe.prenom);
    this.fb1.controls['numeroTele'].setValue(this.employe.numeroTele);
    this.fb1.controls['adresse'].setValue(this.employe.adresse);
    this.fb1.controls['dateembauche'].setValue(this.employe.dateembauche);

  }

  onUpdateEmploye(){  
    this.submitted = true ; 
     if(!this.fb1.valid){ 
          return ;
     }  

     this.userservice.employeprofile(this.employe.id,this.fb1.value) 
       .subscribe((resp:any)=>{ 
             if(resp.STATUS == 200 ) { 
                 this.notification.shownotification("Votre porfil a bien été mise à jour","Annuler","SUCCESS")
             }else if (resp.STATUS == 400 ){  
                 this.notification.shownotification("Cet email est déjà utilisé. merci d'en saisir un nouveau","Annuler","ERROR") 
             }
       },(err)=>{console.log(err)})
   

  }  

  onUpdatePassword(){ 

    this.submittedprime = true ; 
     if(!this.fb2.valid){ 
          return ;
     }  
    
     this.isLoading = true ; 
     this.userservice.changeemployepassword(this.employe.id,this.fb2.value) 
          .subscribe((resp:any)=> { 
                if(resp.STATUS == 600){ 
                   this.notification.shownotification("Mot de passe est incorrect . Essayez à nouveau","Annuler","ERROR"); 
                   this.isLoading = false ;
                }else if (resp.STATUS == 200) { 
                  this.notification.shownotification("Mot de passe a bien été modifié","Annuler","SUCCESS"); 
                  this.submittedprime = false ;  
                  this.isLoading = false ; 
                  this.fb2.reset();
                } 
          } , (err)=>{  
             this.isLoading = false ; 
             console.log(err) 
            })
  } 

  Annuler(){ 
    this.dialogref.close();
  }

  get f() {  
    return this.fb1.controls ;  
  }    
  
  get fprime() { 
    return this.fb2.controls
  }

}
