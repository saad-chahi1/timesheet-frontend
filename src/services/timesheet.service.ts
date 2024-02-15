import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { timesheet } from "src/Models/Timesheet";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class TimesheetService {
    
    private host:String = environment.api_url ;   
    constructor(
        private http:HttpClient , 
        private authservice:AuthService) {  
    }      


    saveupdatetimesheet(timesheet:timesheet,employeid:string){ 
        return    this.http.post(this.host+"employe/"+employeid+"/timesheets",timesheet);
    } 

    submittimesheet(employeid:string,timesheetid:string){ 
        return this.http.put(this.host+"employe/"+employeid+"/timesheets/"+timesheetid+"/submit",{})
    }

    getimesheetbyemployeanddates(employeid:string,dateDebut:string,dateFin:string){  
       
       return   this.http.get(this.host+"employe/"+employeid+"/timesheet/"+dateDebut+"/"+dateFin);
    } 

    rejecttimesheet(timesheetid:string,rejectraison:string){ 
        return this.http.post(this.host+`manager/timesheetadministration/${timesheetid}/reject/${rejectraison}`,{})

    } 

    approuvetimesheet(timesheetid:string){ 
        return this.http.post(this.host+`manager/timesheetadministration/${timesheetid}/approuve`,{})
   } 

    getSubmittedTimesheetsbyEmploye(employeid:string){ 
               return this.http.get(this.host+"employe/"+employeid+"/timesheets"); 

    }


    getTimesheetsByStatus(employeid:string,status:string){ 
               return this.http.get(this.host+"employe/"+employeid+"/timesheets/"+status);
    } 


    getReportByEmployeAndYear(employeid:string,year:string){ 
           return  this.http.get(this.host+"employe/"+employeid+"/report/"+year);
      

    }

    getReportRejectedByEmployeAndYear(employeid:string,year:string){ 
          return this.http.get(this.host+"employe/"+employeid+"rejected/report/"+year);
    
    }

    getAllTimesheets(){ 
         return this.http.get(this.host+"manager/timesheets");
    }  

    getAllTimesheetsByStatus(status:string){ 
        return this.http.get(this.host+"manager/timesheets/"+status);
    } 

    getTimesheetReport(employeid:String , from:String , to:String ){ 
        return this.http.get(this.host+"timesheets/report/"+employeid+"/"+from+"/"+to);
    }

    getTimesheetsByEmployeAndDatesAndStatus(employeid:string , dateDebut:string , dateFin:string , status:string ){ 
        return this.http.get(this.host+"manager/"+employeid+"/timesheets/"+dateDebut+"/"+dateFin+"/"+status);
       /* /employe/{id}/timesheets/{dateDebut}/{dateFin}/{status} */

    } 
    getAllTimesheetsByPeriodAndStatus(dateDebut:string , dateFin:string , status:string){ 
        return this.http.get(this.host+"manager/timesheets/"+dateDebut+"/"+dateFin+"/"+status); 

    } 
    getTimesheetsByEmployeAndDates(employeid:string , dateDebut:string , dateFin:string ){ 
        return this.http.get(this.host+"manager/"+employeid+"/timesheets/"+dateDebut+"/"+dateFin);
       /* /employe/{id}/timesheets/{dateDebut}/{dateFin}/{status} */

    } 
    getAllTimesheetsByPeriod(dateDebut:string , dateFin:string ){ 
        return this.http.get(this.host+"manager/timesheets/"+dateDebut+"/"+dateFin); 

    }


}