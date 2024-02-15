import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-clientprojectsview',
  templateUrl: './clientprojectsview.component.html',
  styleUrls: ['./clientprojectsview.component.scss']
})
export class ClientprojectsviewComponent implements OnInit { 

  projects:any[][] = [];

  clientid:string ;
  
  constructor(private projectservice:ProjectService , @Inject(MAT_DIALOG_DATA) public data:any) { 

      this.clientid = data.clientid ;  
   }

  ngOnInit(): void { 
     this.getProjectByClient();
  } 


  getProjectByClient(){ 
    this.projectservice.getProjectbyClient(this.clientid) 
                .subscribe((resp:any)=>{ 
                      this.projects = resp ; 
                     
                },(err)=>{console.log(err)})
  }

}
