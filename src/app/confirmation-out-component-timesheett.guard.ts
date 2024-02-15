import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsavechangesComponent } from './alertsavechanges/alertsavechanges.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationOutComponentTimesheettGuard implements CanDeactivate<unknown> {
  constructor(private dialog:MatDialog){ 

  }
  
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
       if(localStorage.getItem("talert") == "true"){ 
         return true ; 
       } 
         

       return new Promise((resolve,reject)=>{  
                const dialogConfig = new MatDialogConfig(); 
                dialogConfig.disableClose = false ;
                dialogConfig.autoFocus = true ;   
               
                const dialogref =  this.dialog.open(AlertsavechangesComponent,dialogConfig); 
                dialogref.afterClosed().subscribe((result)=>{  
                  if(result == true){  
                   
                       return resolve(true) ; 
                          
          
                  }else{  
          
                       return resolve(false) ; 
                    
                  } 
                })

       })
     

      
      
   
    
  } 


  
}
