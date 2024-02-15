import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { notification } from 'src/services/notification.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit { 

  public fb:FormGroup  ;  
  public submitted:boolean = false;  
  public isrecaptchachecked:boolean = false ;  
  public isloading:boolean = false ; 

  constructor( 
    private authservice:AuthService ,
    public dialogref:MatDialogRef<ResetpasswordComponent> , 
    private notif:notification , 
    private formBuilder : FormBuilder
    ) {   

      this.fb = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]]
      });


  }

  ngOnInit(): void { 

  }  

  get f() {  
    return this.fb.controls;  
  } 

  submit(){
          // this.notif.shownressetnotification();   
          
    this.submitted = true;    

    if (this.fb.invalid ) {
      return;  
    }  
    if(!this.isrecaptchachecked){ 
       return;
    }  
  
    this.isloading = true  ;    
   
    this.authservice.sendResetEmail(this.fb.value.email) 
         .subscribe( rep =>  
           {      this.isloading = false ;  
                  this.notif.shownressetnotification("Nous vous avons envoyé par email le lien de réinitialisation du mot de passe !","SUCCESS")       
                  this.dialogref.close();  
                } , 
            err => {   
                  this.isloading = false ; 
                  this.notif.shownressetnotification("Email n'existe pas !","ERROR")
            } 
      ) 
      
  

  
  } 

  

  Close(){ 
            this.dialogref.close() 
            
  }  

  resolved(captchaResponse: string) {  
    if(captchaResponse == null){ 
        this.isrecaptchachecked = false ;  
    }else { 
      if(captchaResponse.length !== 0){ 
        this.isrecaptchachecked = true ;  
     } 
    } 
  } 
}
