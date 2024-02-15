import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from 'src/Models/Admin';
import { Employe } from 'src/Models/Employe';
import { Manager } from 'src/Models/Manager';
import { User } from 'src/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private host:String = environment.api_url ;  

  constructor(private http:HttpClient) { }  

  addAdmin(admin:Admin,profileimage:any){  
    const data = new FormData(); 
        if(profileimage!=null){ 
          data.append('image',profileimage); 
        }
        data.append('model',JSON.stringify(admin))
     return this.http.post(this.host+"administrateurs",data);
  }
  
  deleteUser(id:string){ 
     return this.http.delete(this.host+"administration/users/"+id);
  }  

  enableAccount(id:string){ 
      return this.http.put(this.host+"users/unblock/"+id,{observe : 'response'})
  }  

  disableAccount(id:string){ 
     return this.http.put(this.host+"users/block/"+id,{observe : 'response'});
  }

  getAllAdmins(){
     return this.http.get(this.host+"administrateurs");
  } 

  updateAdmin(user:Admin,profileimage:any){  
    const data = new FormData();   
    console.log(user);
    if(profileimage!=null){ 
       data.append('image',profileimage); 
    } 
    data.append('model',JSON.stringify(user))
     return this.http.put(this.host+"administrateurs/"+user.id,data);
  } 

  getAllManagers(){ 
  
    return this.http.get(this.host+"administration/managers");
  } 

  addManager(manager:Manager,profileimage:any){  
    const data = new FormData(); 
        if(profileimage!=null){ 
          data.append('image',profileimage); 
        }
        data.append('model',JSON.stringify(manager))
     return this.http.post(this.host+"managers",data);
  }

  updatemanager(user:Manager,profileimage:any){  

    const data = new FormData();   
    if(profileimage!=null){ 
       data.append('image',profileimage); 
    } 
    data.append('model',JSON.stringify(user))
     return this.http.put(this.host+"managers/"+user.id,data);

  }   

  getAllEmployes(){ 
    return this.http.get(this.host+"administration/employes"); 
  } 

  addEmploye(employe:Employe,profileimage:any){ 
    const data = new FormData(); 
    if(profileimage!=null){ 
      data.append('image',profileimage); 
    }
    data.append('model',JSON.stringify(employe))
    return this.http.post(this.host+"employes",data);
  }  

  
  updateEmploye(user:Admin,profileimage:any){  
    const data = new FormData();   
    console.log(user);
    if(profileimage!=null){ 
       data.append('image',profileimage); 
    } 
    data.append('model',JSON.stringify(user))
     return this.http.put(this.host+"employes/"+user.id,data);
  }  


  changeemployepassword(empid:string , passwordsDTO:any){ 
    return this.http.put(this.host+"employe/"+empid+"/profile/password",passwordsDTO);
  }  


  employeprofile(empid:string , employe:Employe){ 
    return this.http.put(this.host+"employe/"+empid+"/profile" ,employe)
  } 

  changemanagerpassword(managerid:string , passwordsDTO:any) { 
    return this.http.put(this.host+"manager/"+managerid+"/profile/password",passwordsDTO);
  } 

  managerprofile(mpid:string ,manager:Manager){ 
    return this.http.put(this.host+"manager/"+mpid+"/profile",manager)
  }  

  getNotificationbyUser(userid:string){  
     
     return this.http.get(this.host+"utilisateur/"+userid+"/notifications");
  }

  readallnotificationbyUser(userid:string){
    return this.http.put(this.host+"utilisateur/"+userid+"/notifications/vu",{})
  } 
  


}
