import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  
  private host:String = environment.api_url ; 


  constructor(private http:HttpClient) {  
   
  }  

  logout(){ 

    localStorage.removeItem("token");
    localStorage.removeItem("currentuser")
  }  


  login(username:string,password:string):Observable<any>{  
       return this.http.post(this.host+"login", 
       {username,password},{observe : 'response'}
       )
  }     

  getCurrentUser(){ 
    return this.http.get(this.host+"currentuser");
  }
  

  getUserFromCache(){ 
    return JSON.parse(localStorage.getItem("currentuser")||"{}"); 

  }

  saveCurrentUser(user:User){ 
     localStorage.setItem("currentuser",JSON.stringify(user));
  }


  sendResetEmail(email:string):Observable<any>{ 
       return this.http.post(this.host+"resetpassword/?email="+email,{responseType: 'json',headers : {skip : "true"}})
  }

  validpasswordtoken(token:string):Observable<any>{     
      return this.http.post(this.host+"validtoken/"+token,{ observe: 'response', headers : {skip : "true"} });
  } 

  resetpassword(body:any):Observable<any>{ 
    return this.http.post(this.host+"savenewpassword",body,{ observe : 'response',headers : {skip : "true"}})
  }

  isLoggedIn(){  
    
    let mom:any = this.getExpirationMoment();    
    if(mom === undefined){  
      return false ; 
    }else{ 
      return moment().isBefore(mom);
    }
    
  }
  
  getToken(){ 
    return localStorage.getItem("token");
  }  

  savetoken(token:string){ 
      localStorage.setItem("token",token);  
  }  

  getExpirationMoment() { 
    let m:any  ; 
    const token = localStorage.getItem("token");  
    if(token != null){
      let jwthelper = new JwtHelperService();  
      let jwtobject = jwthelper.decodeToken(token);   
      let mnt:any = moment().add(jwtobject.exp,'ms') 
      m =  moment(mnt);  
    } 
    return m ; 
  }      


  getUsername(){
    const token = localStorage.getItem("token");  
    let username:string=""; 
    if(token != null){ 
      let jwthelper = new JwtHelperService();  
      let jwtobject = jwthelper.decodeToken(token);  
      username = jwtobject.subject ; 
    }
    return username ; 
  }

  getRole(){ 
    const token = localStorage.getItem("token");   
    let role:string="" ; 
    if(token != null){ 
      let jwthelper = new JwtHelperService();  
      let jwtobject = jwthelper.decodeToken(token);  
      role = jwtobject.roles[0] ; 
    } 
    return role ; 
  }



}
