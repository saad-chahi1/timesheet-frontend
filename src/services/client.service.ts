import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Client } from "src/Models/Client";

@Injectable({
    providedIn: 'root'
  })
  export class ClientService {
    
    private host:String = environment.api_url ;   
    constructor(private http:HttpClient) { 
    } 
    
    getClients(){ 
        return this.http.get(this.host+"clients");
    }   

    addClient(client:Client){ 
        return this.http.post(this.host+"clients",client);
    }

    deleteClient(id:string){ 
       return this.http.delete(this.host+"clients/"+id , {responseType: 'text'});
    } 

    updateClient(id:String,newclient:Client){ 
       return this.http.put(this.host+"clients/"+id,newclient);
    }



  }