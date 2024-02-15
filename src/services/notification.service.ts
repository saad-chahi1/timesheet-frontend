import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable() 
export class notification { 
    
    constructor(private snackbar:MatSnackBar ){ 
    }   


    shownotification(displaymessage:string,buttontext:string,type:string){  
      
        switch(type){ 
                 
               case "ERROR" :  
                  
               this.snackbar.open(displaymessage,buttontext,{ 
                duration : 5000  ,
                horizontalPosition : 'right' , 
                verticalPosition : 'top', 
                panelClass: ['red-snackbar'] 

               
             });
             break ; 
               
               
               case "SUCCESS" : 
                  this.snackbar.open(displaymessage,buttontext,{ 
                  duration : 5000  ,
                  horizontalPosition : 'right' , 
                  verticalPosition : 'top', 
                  panelClass: ['green-snackbar']
                
               }); 

            break ;   
            }       
    } 

    shownressetnotification(displaymessage:string,type:string){ 
      switch(type){ 

         case "ERROR" :   

          this.snackbar.open(displaymessage,"Annuler",{ 
          duration : 5000  ,
          horizontalPosition : 'center' , 
          verticalPosition : 'top', 
          panelClass: ['red-snackbar'] 

        });
       break ; 
         
         case "SUCCESS" : 
            this.snackbar.open(displaymessage,"Annuler",{ 
            duration : 5000  ,
            horizontalPosition : 'center' , 
            verticalPosition : 'top', 
            panelClass: ['green-snackbar']
          
         }); 

      break ;   
      }     
 }  


   showsubmittednotificationalert(){ 
       
      this.snackbar.open(" Modification non autorisée car la feuille est en cours de validation","Annuler",{ 
         duration : 5000  ,
         horizontalPosition : 'center' , 
         verticalPosition : 'top', 
         panelClass: ['orange-snackbar'] 

       });
   }


    showrestpasswordnotification(displaymessage:string,type:string){ 
             
        switch(type){ 

            case "ERROR" :   

             this.snackbar.open(displaymessage,"Annuler",{ 
             duration : 5000  ,
             horizontalPosition : 'center' , 
             verticalPosition : 'top', 
             panelClass: ['red-snackbar'] 

           });
          break ; 
            
            case "SUCCESS" : 
               this.snackbar.open(displaymessage,"Annuler",{ 
               duration : 5000  ,
               horizontalPosition : 'center' , 
               verticalPosition : 'top', 
               panelClass: ['green-snackbar']
             
            }); 

         break ;   
         }       
    }
 
}