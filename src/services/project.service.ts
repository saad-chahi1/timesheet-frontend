import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Affectation } from "src/Models/Affectation";
import { Employe } from "src/Models/Employe";
import { Phase } from "src/Models/Phase";
import { Project } from "src/Models/Project";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    
    private host:String = environment.api_url ;   
    constructor(
        private http:HttpClient , 
        private authservice:AuthService) { 
    }   

    addproject(project:Project,Files:File[]){  
        const data = new FormData(); 
        data.append("model",JSON.stringify(project)); 
        for (var i = 0; i < Files.length; i++) {   
            data.append("files", Files[i]);  
          }   
        return this.http.post(this.host+"projects",data);
    } 

    getprojects() { 
        return this.http.get(this.host+"projects");
    } 

    getArchivedprojects(){ 
        return this.http.get(this.host+"projects/archive");
    }
    
    deleteProject(id:string){  
        return this.http.delete(this.host+"projects/"+id);
    }  

    archiveproject(id:string){ 
        return this.http.put(this.host+"projects/archive/"+id,{});
    } 

    updateproject(id:string,project:Project){
        return this.http.put(this.host+"projects/"+id,project);
    }


    addphasetoproject(id:string,phase:Phase){ 
        return this.http.post(this.host+"projects/"+id+"/phases",phase);
    } 

    getProjectById(id:string){  
        return this.http.get(this.host+"projects/"+id);
    } 

    deletePhaseProject(id:string){ 
           return this.http.delete(this.host+"phases/"+id);

    } 
    updatephaseproject(id:string,phase:Phase){  
    
           return this.http.put(this.host+"phases/"+id,phase);
    } 

    addEmployesToTeam( projectid:string ,employes:Employe[]){ 
        return this.http.post(this.host+"projects/"+projectid+"/equipe",{ equipe :employes})
    } 

    deleteemployeteam(projectid:string,employeid:string){ 
        return this.http.delete(this.host+"projects/"+projectid+"/equipe/"+employeid)
    } 

    getAffectationsByProject(projectid:string){ 
        return this.http.get(this.host+"projects/"+projectid+"/affectations"); 
    } 

    addaffectation(affectation:Affectation){ 
       return this.http.post(this.host+"projects/affectations",affectation);
    } 

    deleteAffectation(id:string){ 
         return this.http.delete(this.host+"affectations/"+id);
    } 

    updateaffectation(id:string,affectation:Affectation){ 
        return this.http.put(this.host+"affectations/"+id,affectation);
    }   

    getAffectationByEmployeAndProject(projectid:string,employeid:string){ 
      return this.http.get(this.host+"employes/"+employeid+"/projects/"+projectid+"/affectations") 

    }

    deleteDocument(projectid:string,documentid:string){
        return this.http.delete(this.host+"projects/"+projectid+"/documents/"+documentid)
    }

    adddocumentstoproject(projectid:string,files:File[]){ 
        const data = new FormData(); 
        for (var i = 0; i < files.length; i++) {   
            data.append("files", files[i]);  
        }  

        return this.http.post(this.host+"projects/"+projectid+"/documents",data);
        
    } 
    
    changeaffectationstatus(id:string){ 
        return this.http.put(this.host+"employes/affectations/"+id+"/updatestate",{});
    }  


    getPhasesByProject(projectid:string){ 
          return this.http.get(this.host+"projects/"+projectid+"/phases");
    }

    getProjectByPhase(id:string){ 
        return this.http.get(this.host+"phases/"+id+"/project");
    } 

    getProjectReport(projectid:string){ 
        return this.http.get(this.host+"projects/"+projectid+"/reporting");
    }

    getPhaseReport(phaseid:string){ 
       
        return this.http.get(this.host+"phases/"+phaseid+"/reporting");
        
    }

    getTotalAffectationByEmploye(employeid:string){ 
        return this.http.get(this.host+"employes/"+employeid+"/affectations/total")
    
    }
    
    getTotalProjectByEmploye(employeid:string){ 
        return this.http.get(this.host+"employes/"+employeid+"/projects/total");
     
    }
    
    getProjectbyClient(clientid:string){ 
       return this.http.get(this.host+"clients/"+clientid+"/projects")
    }  

    getProjectsReport(empid:string){ 
        return this.http.get(this.host+"projects/report/"+empid);
    } 

    getProjectGanttView(id:string){ 
        return this.http.get(this.host+"projects/"+id+"/gantt")
    } 

    getRentabByProjectAndByEmploye(projectid:string , employeid:string){  
          return this.http.get(this.host+"projects/"+projectid+"/equipe/"+employeid+"/renta")
    }

    getProjectConsumedDetail(id:string){  
        return this.http.get(this.host+"projects/"+id+"/consumeddetails")
     
    } 

    getAffectationsByEmployeAndProject(projectid:string,employeid:string){ 
       return this.http.get(this.host+"employe/"+employeid+"/affectations/"+projectid)
 
    }

    getNotAffectedPhasesByEmployeAndProject(projectid:string , employeid:string){ 
       return this.http.get(this.host+"projects/"+projectid+"/"+employeid+"/notAffectedPhases") 

    } 

    //V2
    sendAffectations(affectations:any , projectid:string){ 
      return this.http.post(this.host+"employes/projects/"+projectid+"/affectations",affectations);
    }

}