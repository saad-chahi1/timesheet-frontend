import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/services/auth.service'; 
import { AdminRoutes } from '../routes/AdminRoutes' ; 
import { ManagerRoutes } from '../routes/ManagerRoutes' ; 
import { EmployeRoutes } from '../routes/EmployeRoutes' ;
import { Router, RouterOutlet } from '@angular/router'; 
import { MediaObserver , MediaChange } from '@angular/flex-layout' ;  


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManagerprofileComponent } from '../profiles/managerprofile/managerprofile.component';
import { EmployeprofileComponent } from '../profiles/employeprofile/employeprofile.component';
import { UserService } from 'src/services/user.service';
import { Notification } from 'src/Models/Notification';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] , 

})
export class DashboardComponent implements OnInit , OnDestroy {
  
  public routes:any = [];  
  public mediaSub:any ;  
  public isloading:boolean = true ; 
  public mobile:boolean = false ;   
  public isprofileclicked = false ; 
  public selected:number = 1 ;    
  public isnotificationclicked = false ;  
  public notifications:Notification[] = [] ; 
  @ViewChild('profileclick') profileclick;  
  @ViewChild('notifclick') notificationclick; 

  constructor( 
    private authservice:AuthService  , 
    private router:Router , 
    private userservice:UserService ,
    public mediaobserver:MediaObserver ,
    private dialog:MatDialog, 
    private eRef:ElementRef
    ) {  

     this.setRoutesByRole();   
     
     
  } 

  prepareRoute(outlet:RouterOutlet){ 
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.profileclick.nativeElement.contains(event.target)) { 
        this.isprofileclicked = true ; 
    } else { 
        this.isprofileclicked =   false ; 
    } 

    if(this.notificationclick.nativeElement.contains(event.target)) { 
      this.isnotificationclicked = true ; 
     } else { 
      this.isnotificationclicked =   false ; 
  }
  }

  ngOnInit(): void {    

      
       //save current user 
       
       this.authservice.getCurrentUser()
              .subscribe((resp)=>{ 
                  this.authservice.saveCurrentUser(resp);  
                  setTimeout(() => { 
                    this.isloading = false ;  
                  },2000);
                 
                  this.displaychildrebyrole();  
                  //get Notification  
                
                  this.getNotification();
                
              },(err)=>{  
                  this.isloading = false ; 
                console.log(err);
       })        
       

       

       this.mediaSub = this.mediaobserver.media$.subscribe((result:MediaChange)=> 
       { console.log(result.mqAlias) }
       ); 

       

  }     


  hidenotifications(){ 
    
    this.userservice.readallnotificationbyUser(this.authservice.getUserFromCache().id)
         .subscribe((resp)=>{ 
          this.notifications = [];
         },(err)=>{ 
            console.log(err);
         });
  }

  getNotification(){ 
      this.userservice.getNotificationbyUser(this.authservice.getUserFromCache().id) 
          .subscribe((resp:any)=>{ 
                  this.notifications = resp ; 
                  console.log(resp);
           },(err)=>{ 
                  console.log(err);
           })
  }
  
  changestate(){   
    this.isprofileclicked = !this.isprofileclicked ; 
  } 



  changeSelected(i:any){   
    this.selected = i ; 
    /* this.router.events.subscribe((result:any)=>{  
       
      // console.log(result.url);  
      // console.log(window.location.href)
       if(this.router.url == result.url){ 
            return;
       }else{  
        
       
       }
     }) */
      
  }

  ngOnDestroy(){  
     
     this.mediaSub.unsubscribe();

  }
  
  getUserRole(){ 
    return this.authservice.getRole();
  }

  setRoutesByRole(){ 
       let role:string = this.authservice.getRole();  
       switch(role){ 
         case "ADMIN" : 
             this.routes = AdminRoutes ; 
          break ; 

         case "MANAGER" : 
             this.routes = ManagerRoutes ; 
          break ; 
         
         case "EMPLOYE" : 
             this.routes = EmployeRoutes ; 
          break ; 
       }
       
  } 

  logout(){ 
    this.authservice.logout(); 
   // this.router.relo;   

   window.location.reload();
  } 


  displaychildrebyrole(){ 
    let role:string = this.authservice.getRole() ; 
    switch (role) {
      case "ADMIN":
           this.router.navigate(["dashboard/admin"]);
           break;
      case "MANAGER":
          this.router.navigate(["dashboard/manager"]);
           break; 
      case "EMPLOYE":
          this.router.navigate(["dashboard/employe"]);
           break;
      default:
        break;
    }
    
  } 

  openprofile(){  
    

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.minHeight = "80vh" ;  
    dialogConfig.data = { active : 1} ;

 //    dialogConfig.data =  { 'projectid' : this.projectid }
   
     /*
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
           
             this.projectdetails.projectDocuments = result.data ;  
          }    
    }) */

    let role:string = this.authservice.getRole() ;  

    switch (role) {
      case "MANAGER": 
        
           const dialogref1 =  this.dialog.open(ManagerprofileComponent,dialogConfig);
           break; 
      case "EMPLOYE":
           const dialogref2 =  this.dialog.open(EmployeprofileComponent,dialogConfig);
           break;;
      default:
        break;
  } 
} 
openpasswordactive(){  
    

  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = false ;
  dialogConfig.autoFocus = false ;    
  dialogConfig.minWidth = "50vw" ;
  dialogConfig.minHeight = "80vh" ;  
  dialogConfig.data = { active : 2 } ;

//    dialogConfig.data =  { 'projectid' : this.projectid }
 
   /*
  dialogref.afterClosed().subscribe((result)=>{ 
        if(result){  
         
           this.projectdetails.projectDocuments = result.data ;  
        }    
  }) */

  let role:string = this.authservice.getRole() ;  

  switch (role) {
    case "MANAGER": 
      
         const dialogref1 =  this.dialog.open(ManagerprofileComponent,dialogConfig);
         break; 
    case "EMPLOYE":
         const dialogref2 =  this.dialog.open(EmployeprofileComponent,dialogConfig);
         break;;
    default:
      break;
} 
}

}
