import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-employeprojectdurationdetails',
  templateUrl: './employeprojectdurationdetails.component.html',
  styleUrls: ['./employeprojectdurationdetails.component.scss']
})
export class EmployeprojectdurationdetailsComponent implements OnInit {
  
  public employeid:string ;  
  public projectid:string ;   
  public phases:any[][] = [] ; 
  public loading:boolean = false ; 


  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private projectservice:ProjectService) { 
   this.employeid = data.employeid ; 
   this.projectid = data.projectid ; 
   }

  ngOnInit(): void { 
      this.loading = true; 
      this.projectservice.getAffectationsByEmployeAndProject(this.projectid,this.employeid) 
         .subscribe((resp:any)=>{   
             this.loading = false ; 
             this.phases = resp ; 
         },(err)=>{  
             this.loading = false ;  
          console.log(err)})
  } 

  getdateobject(date:string){ 
    return new Date(date)
  }

  getSum(){ 
    let sum = 0 ; 
    this.phases.map((v) =>{ 
       let z =parseFloat(v[2].slice(0,2)+"."+v[2].slice(3,5)) 
       sum += z ; 
    })  
    return sum.toFixed(2) ;
  } 

}
