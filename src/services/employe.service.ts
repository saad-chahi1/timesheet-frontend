import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Client } from "src/Models/Client";
import { Employe } from "src/Models/Employe";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class EmployeService { 
 
    private host:String = environment.api_url ;   
    private employe:Employe  ; 
    
    constructor(private http:HttpClient,private authservice:AuthService) {  
            this.employe = authservice.getUserFromCache(); 
            
    }  
     getEmployeProjects(){ 
          return this.http.get(this.host+"employes/"+this.employe.id+"/projects") 
        
     }
    

  }