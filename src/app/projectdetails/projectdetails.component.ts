import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Affectation } from 'src/Models/Affectation';
import { Employe } from 'src/Models/Employe';
import { Phase } from 'src/Models/Phase';
import { Project } from 'src/Models/Project';
import { ProjectService } from 'src/services/project.service';
import { AddAffecComponent } from './add-affec/add-affec.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { AddemployetoprojectComponent } from './addemployetoproject/addemployetoproject.component';
import { AddphaseComponent } from './addphase/addphase.component';
import { AffecterEmployeComponent } from './affecter-employe/affecter-employe.component';
import { ProjectcosumeddetailsComponent } from './projectcosumeddetails/projectcosumeddetails.component';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit { 

  public projectid!:string ;   
  public projectdetails!:Project ; 

 
  public Employes:Employe[] = [] ; 
  public Phases:Phase[] = [] ; 
  public Affectation:any[] = [] ;    
  public totalhours:string = "00:00" ; 
  public duree:number = 0 ; 
  public test!:any; 
 


   constructor(private route: ActivatedRoute , 
              private projectservice:ProjectService , 
              private dialog:MatDialog
    ) { 
//
    this.route.params.subscribe(params => { 
      this.projectid = params.projectid   
    })  

   }  

   ngOnInit(): void { 

    this.projectservice.getProjectById(this.projectid) 
              .subscribe((resp:any)=>{ 
                     this.projectdetails = resp ;    
                     console.log("project details");
                     console.log(this.projectdetails)
                    // this.duree = this.projectdetails.duree ; 
                    // this.Phases = this.projectdetails.phases ;    changed
                 
              },(err)=>{ 
                console.log(err);
              })    
    
    this.projectservice.getPhasesByProject(this.projectid) 
             .subscribe((resp:any)=>{ 
                    this.Phases = resp ;  

             },(err)=>{  
               console.log(err);
             }) 

         this.getProjectReport(); 
         this.getAffectations() ; 

  }     

  getDurationFromPhases():number{  
      let sum = 0 ; 
      this.Phases.map((phase)=>{ 
        sum = sum + phase.duree
      }) 
      return sum ; 
  }

  getAffectations(){ 
    this.projectservice.getAffectationsByProject(this.projectid)
         .subscribe((resp:any)=>{            
                 if(resp.STATUS == 200){ 
                      this.Affectation = resp.RESPONSE 
                 }else{ 
                   console.log("Internal error")
                 }
         },(err)=>{ 
           console.log(err)
         })    
  }

 

  deletePhase(event:any){  
     this.Phases =  this.Phases.filter((phase)=> phase.id != event);   
     //this.projectdetails.phases = this.Phases ; 
  } 

  deleteTeamMember(event:any){ 
    this.projectdetails.equipe = this.projectdetails.equipe.filter((employe) => employe.id != event ) 
   // this.projectdetails.equipe = this.Equipe ; 
  }
  
 
  AddAffectation(){   
   // old one
    /*
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ;  
    dialogConfig.data = { phases : this.Phases , equipe : this.projectdetails.equipe  }   
  
    const dialogref =  this.dialog.open(AddAffecComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){   
  
              this.Affectation.push(result.data);              
          }    
    })
    */ 

    //new one  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ;  
    dialogConfig.data = {  equipe : this.projectdetails.equipe , projectid : this.projectid  }   
  
    const dialogref =  this.dialog.open(AffecterEmployeComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){    
              this.getAffectations()
              
          }    
    })


  } 

  deleteAffectation(id:string){ 
     this.Affectation = this.Affectation.filter((af) => af.id !== id)
  } 

  updateAffectation(affectation:Affectation){ 
    console.log("AVANT")
    console.log(this.Affectation)
    const index = this.Affectation.findIndex((obj)=>obj.id == affectation.id); 
    this.Affectation[index] = affectation ;   
    console.log("APRES")
    console.log(this.Affectation)
  }

   AddPhase():void{ 

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ; 
    dialogConfig.data = { projectid : this.projectid }  


    const dialogref =  this.dialog.open(AddphaseComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
              this.Phases.push(result.data); 
           //   this.projectdetails.phases = this.Phases ;             changed  
          }    
    })

   } 


   change(event:any){   
     console.log(event)
   }

   AddEmploye():void{  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ;
    dialogConfig.data = { project : this.projectdetails } 
    console.log(this.projectdetails.equipe)
    const dialogref =  this.dialog.open(AddemployetoprojectComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){   
              //updating our project team with the new team  
              this.projectdetails = result.data ;
  
            
          }    
    })
 
   }   

   openProjectConsumed(){ 

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ; 
    dialogConfig.data =  { 'projectid' : this.projectid }
    const dialogref =  this.dialog.open(ProjectcosumeddetailsComponent,dialogConfig);
   }

   AddDocument():void{ 

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ; 
    dialogConfig.data =  { 'projectid' : this.projectid }
    const dialogref =  this.dialog.open(AdddocumentComponent,dialogConfig);
     
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
           
             this.projectdetails.projectDocuments = result.data ;  
          }    
    })
   }


   deleteDocument(id:string){
      this.projectdetails.projectDocuments = this.projectdetails.projectDocuments.filter(doc =>  doc.id !== id )
   } 


   getProjectReport(){ 
     this.projectservice.getProjectReport(this.projectid)
        .subscribe((resp:any)=>{ 
                if(resp.STATUS == 200){ 
                    this.setTotalhours(resp.HOURS);
                 
                }
        },(err)=>{console.log(err)}) 
   } 

   setTotalhours(hours:string[]){  
    
        let sum = "00:00" ; 
        hours.map((v)=>{ 
            sum = this.addTimes(sum,v)
        }) 

        this.totalhours = sum ;  
        
   }

   addTimes (startTime:any, endTime:any) {
    var times = [ 0, 0]
    var max = times.length
  
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
  
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    } 
   
  
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
  
    var hours = times[0]
    var minutes = times[1]

    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
  
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  }  



  

}
