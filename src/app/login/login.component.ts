import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { notification } from 'src/services/notification.service';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  private autherservice:AuthService ;  
  public ischecked:boolean = false ; 
  public username:string = "" ;   
  public isLoading:boolean = false; 
  public role:string = "" ;  

  public showpassword:boolean = false ; 

  constructor( 
        private authservice:AuthService ,  
        public snackbar:MatSnackBar , 
        private notification:notification  , 
        private router:Router , 
        private dialog:MatDialog
        ) {  
         this.autherservice = authservice ;    
         console.log(authservice.isLoggedIn()) 
         console.log(authservice.getRole()) 

        
  }

  ngOnInit():void { 
    
   let  username = localStorage.getItem("username") || null ;  

   if(username != null){ 
     this.username = username 
     console.log(this.username)
   }
   
   
  }  

  setCheck(value){ 
      this.ischecked = value ; 
  }

  onSubmit(data:any){ 
    this.isLoading = true    ;  
    this.check(data); 
    this.autherservice.login(data.username,data.password) 
                      .subscribe(resp => { 
                             //  console.log(resp.headers['authorization']);      
                                                
                           let token:string = resp.headers.get('authorization') || ""; 
                           this.autherservice.savetoken(token); 
                             this.isLoading = false ; 
                             this.notification.shownotification( 
                              "Bienvenue sur MyTime", 
                              "Annuler","SUCCESS"); 
                              this.router.navigateByUrl("/dashboard")
                      },err => { 
                             this.notification.shownotification( 
                               "Les informations de connexion que vous avez saisies ne correspondent pas , Réessayer", 
                               "Annuler","ERROR"); 
                               this.isLoading = false ; 
                      } 
                      )  


    }  
    check(data:any){ 
      
      if(this.ischecked == true){  
    
          localStorage.setItem("username",data.username);
      }
    }

    
    openResetPasswordModal(){ 
       
      
    } 

    openDialog() {

      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ; 
      this.dialog.open( ResetpasswordComponent , dialogConfig);

  } 

} 



