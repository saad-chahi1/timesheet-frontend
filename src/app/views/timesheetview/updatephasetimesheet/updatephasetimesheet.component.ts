import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { Affectation } from 'src/Models/Affectation';
import { Client } from 'src/Models/Client';
import { Phase } from 'src/Models/Phase';
import { Project } from 'src/Models/Project';
import { AuthService } from 'src/services/auth.service';
import { ClientService } from 'src/services/client.service';
import { EmployeService } from 'src/services/employe.service';
import { ProjectService } from 'src/services/project.service';
import { AddphasetimesheetComponent } from '../addphasetimesheet/addphasetimesheet.component';

@Component({
  selector: 'app-updatephasetimesheet',
  templateUrl: './updatephasetimesheet.component.html',
  styleUrls: ['./updatephasetimesheet.component.scss']
})
export class UpdatephasetimesheetComponent implements OnInit {

  clients:Client[] = [];   
  isdisabledprojet:boolean = false ; 
  isdisabledphase:boolean = false ; 
  private projects:Project[] = [] ;  
  filteredprojects:Project[] = [] ; 
  phases:Phase[] = [] ; 

  fb:FormGroup ; 


  constructor( 
    @Inject(MAT_DIALOG_DATA) public data:any ,  
    public dialogref:MatDialogRef<AddphasetimesheetComponent> ,  
    private formBuilder:FormBuilder ,
    public clientservice:ClientService , 
    private employesservice:EmployeService , 
    private projectservice:ProjectService , 
    private authservice:AuthService
    
    ) { 
      this.fb = this.formBuilder.group({
       client : ['', [Validators.required]] ,
       projet : ['' , [Validators.required] ] , 
       phase : ['' , [Validators.required]]
     
      }); 
     }

  ngOnInit(): void { 

    this.clientservice.getClients().subscribe 
     ((resp:any) =>{  
            this.clients = resp ;   
            this.fb.controls['client'].patchValue(this.data.phase.project.client.id);
     }, 
      (err) => { 
            console.log(err);
      }
     )   

     this.setprojects(); 

     this.onChanges();
  } 

  onChanges(){ 
    this.fb.get('client') 
        ?.valueChanges.subscribe((selectedclient)=> {  
     
           if(selectedclient == ""){  
              this.isdisabledprojet = false ; 
              this.filteredprojects = []
           }else{   
              this.filteredprojects = this.projects.filter((project:Project) =>  project.client.id == selectedclient  )
              this.fb.controls['projet'].setValue("");
              if(this.filteredprojects.length == 0){ 
                this.isdisabledprojet = false ; 
              }else{ 
                this.isdisabledprojet = true ; 
              }
              
           }
        }) 
    this.fb.get('projet')
       ?.valueChanges.subscribe((selectedproject)=>{  
        this.fb.controls['phase'].setValue("");
          if(selectedproject == ""){  
            this.isdisabledphase = false ; 
          }else{ 
            this.isdisabledphase = true  ; 
            this.setPhases(selectedproject) 

          }
              
       })    
  } 
  
  getPhaseName(phase:string){ 
    return getPhaseTypeByName(phase);
 }
  

  setprojects(){  
    this.employesservice.getEmployeProjects() 
    .subscribe((resp:any)=>{   
       this.projects = resp ;   
     //  alert(this.data.phase.project.id)
      
    },
      (err)=>{ 
        console.log(err);
      } 
     )
  } 

  setPhases(projectid:string ){  
    this.phases = [] ; 
    let employeid = this.authservice.getUserFromCache().id;
    this.projectservice.getAffectationByEmployeAndProject(projectid,employeid) 
    .subscribe((resp:any)=>{  

         resp.map((affectation:Affectation)=> {  
          this.addtophasearray(affectation.phase!) 
      
        
        }       
          
        ) 

        
        if(this.phases.length == 0){  
         
          this.fb.get('phase')?.disable();  
         
        }else { 
          this.fb.get('phase')?.enable();  
        }
        
    }, (err)=>{ 
      console.log(err)
    }
      
    ) 
  }
  
  onUpdatePhaseTimesheet(){ 

    if(this.fb.invalid){ 
      return ; 
    } 

    
     let phase:any = this.fb.value.phase ;  
     

    this.dialogref.close({data: this.getphase(phase)})

  }

  Annuler(){ 
    this.dialogref.close();
  }

  isprojectselecetd(){ 
        this.fb.value
  } 

  getphase(id:string){ 
    let index =  this.phases.findIndex((p)=> p.id == id )  
    return this.phases[index]
  }

  isclientselected():boolean{   
    return true ? !(this.fb.value['client'] == 'defaultvalue') : false
     
  } 

  addtophasearray(phase:Phase){ 
    let index =  this.phases.findIndex((p)=> p.id == phase.id ) 
    if(index == -1){ 
       this.phases.push(phase);
    }
  }

  get f() {  
    return this.fb.controls ;  
  }


}
