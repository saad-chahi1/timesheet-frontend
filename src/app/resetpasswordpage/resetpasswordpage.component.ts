import { Component, OnInit } from '@angular/core'; 

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service'; 
import { notification } from 'src/services/notification.service';
import { MustMatch } from '../helpers/mustmutch' ; 


@Component({
  selector: 'app-resetpasswordpage',
  templateUrl: './resetpasswordpage.component.html',
  styleUrls: ['./resetpasswordpage.component.scss']
})
export class ResetpasswordpageComponent implements OnInit { 

  private resettoken:any;    
  public istokenvalid:boolean = true;  
  public fb:FormGroup; 
  public submitted:boolean = false;   
  public loading:boolean = false; 
  public isrecaptchachecked:boolean = false; 

  constructor(  
    private router: Router, 
    private route:ActivatedRoute , 
    private authservice:AuthService , 
    private formBuilder: FormBuilder , 
    private notification:notification
    ) {   
    this.route.params.subscribe(params => { 
      this.resettoken = params.token 
    })   
    
    // initialize form group 

    this.fb = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword: ['', Validators.required] 
    }, {
      validator: MustMatch('password','confirmpassword')
    });
  }

  ngOnInit(): void {  

  } 

  get f() {  
    return this.fb.controls;  
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

  onResetPassword(){    
    this.submitted = true;   

    if (this.fb.invalid ) {
      return;  
    }  
    if(!this.isrecaptchachecked){ 
       return;
    }
    
    this.loading = true ; 

    this.fb.value.token = this.resettoken ; 
    this.authservice.resetpassword(this.fb.value) 
    .subscribe( data => {  
          if(data.status  == 200){  
             this.router.navigate(['/login']);
            this.notification.showrestpasswordnotification("Votre mot de passe a bien été réinitialisé","SUCCESS"); 
          
            this.resetForm();
          }
          this.loading = false ; 
    } , err => {  
         this.loading = false ; 
           if(err.status == 400){ 
            this.notification.showrestpasswordnotification(" le jeton inclus dans la demande n'est pas valide ou la session est expirée","ERROR"); 
          }
    })
    ;
  }   

  resetForm(){ 
    this.fb.reset();
  } 
  
  backtologin(){ 
    this.router.navigateByUrl("login");
  }

}
