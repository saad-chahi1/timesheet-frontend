import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeprojectdurationdetailsComponent } from 'src/app/projectdetails/employeprojectdurationdetails/employeprojectdurationdetails.component';
import { Project } from 'src/Models/Project';
import { User } from 'src/Models/User';
import { AuthService } from 'src/services/auth.service';
import { EmployeService } from 'src/services/employe.service';
import { ProjectService } from 'src/services/project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  panelOpenState:boolean = false ; 
  projects:Project[]  = [];  
  totalaffectation:number = 0  ; 
  public isLoading:boolean = false ;  
  public loading:boolean = false ;   
  public searchvalue:String ;  
  public page:any = 1 ; 
  public pageSize:any = 5 ;    
  
  employes:User[] = [{prenom:"Said",nom:"Dekaki"} , {prenom:"yassine",nom : "Dekaki"}]
  constructor(private dialog:MatDialog ,  
     private employesservice:EmployeService , private authservice:AuthService , private projectservice:ProjectService) { 
    
   } 
   openaffectation(projectid:string){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "40vw" ; 
    dialogConfig.maxHeight = "60vh" ;
    dialogConfig.data = { employeid : this.authservice.getUserFromCache().id , projectid : projectid }  
    const dialogref =  this.dialog.open(EmployeprojectdurationdetailsComponent,dialogConfig)
  }
  

  ngOnInit(): void {  
       this.getData(); 
       this.setTotalAffectation();
  } 


  setTotalAffectation(){ 
    this.projectservice.getTotalAffectationByEmploye(this.authservice.getUserFromCache().id) 
         .subscribe((resp:any)=>{ 
                this.totalaffectation = resp.TOTAL ; 
         },(err)=>{ 
            console.log(err);
         })
  }


  getData(){ 
    this.loading = true ; 
    this.employesservice.getEmployeProjects() 
    .subscribe((resp:any)=>{   
      this.loading = false ;
      this.isLoading = false ; 
      this.projects = resp ; 
    },
      (err)=>{ 
        this.loading = false ; 
        console.log(err);
      } 
     )
  }

}
