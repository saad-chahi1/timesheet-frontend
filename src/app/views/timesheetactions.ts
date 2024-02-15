import { jourTimesheets } from "src/Models/JourTimesheets";
import { PhaseTimesheet } from "src/Models/PhaseTimesheet";
import { timesheet } from "src/Models/Timesheet";

//this function changes the json data format that comes from backend , so that we can display it in the timesheet tables . 
export function convertToTableFormat(timesheetData:timesheet){  
    let datasheet = Object.assign({},timesheetData) ;    
    let tab:any[] = [] ;  
    let result:any = {}  ; 
    result.id = datasheet.id ; 
    result.dateDebut =  datasheet.dateDebut ; 
    result.dateFin = datasheet.dateFin ; 
    result.description = datasheet.description ;  
    result.status = datasheet.status ; 
    result.lastupdate = datasheet.lastupdate ;  
    result.employe = datasheet.employe ; 
    result.totalduration = datasheet.totalduration ;  
    result.rejectedBy = datasheet.rejectedBy ; 
    result.rejectedAt = datasheet.rejectedAt ; 
    result.approuvedBy = datasheet.approuvedBy ; 
    result.approuvedAt = datasheet.approuvedAt ; 
    result.raisonRejection = datasheet.raisonRejection; 
    

    datasheet.jourTimesheets!.map((m:jourTimesheets) => {  

        m.phaseTimesheets!.map((n:PhaseTimesheet) =>{ 
          let obj:any = {} ;  
          if(tab.findIndex(val => val.phase.id == n.phase!.id ) == -1 ){ 
             // obj.phase = { id : n.phase!.id }; 
             obj.phase = n.phase ; 
              obj.week = [] ;   
              obj.week.push({ 'id' : m.id ,'date' : m.date  , 'duration' : n.duration , 'description' : n.description}); 
              tab.push(obj);
          }else {  
              let index = tab.findIndex((e) => e.phase.id == n.phase!.id);  
              tab[index].week.push({ 'id' : m.id ,  'date' : m.date  , 'duration' : n.duration , 'description' : n.description});  
          }  
        });   
       
    });  

    result.data = tab ;  
    result.data.map((p) => { 
      p.week.sort((a,b)=> { return +new Date(a.date) - +new Date(b.date) })
   })
    return Object.assign({},result)  ; 

} 

// convert to api format so that we can store it in the backend . 

export function convertToApiFormat(timesheetdata:any){ 
    let obj = Object.assign({},timesheetdata); 
 /*   let serverdata = { 
         Id : "ATZUYE1234" , 
         Datefrom : "2021-03-22" , 
         Dateto : "2021-03-26" , 
         Description : "Building the timesheet" , 
         status : "Not Submitted" , 
         lignetimesheet :[]
    };  */  
  
  
    let serverdata:any  = {  
         id : timesheetdata.id ,
         dateDebut : timesheetdata.dateDebut , 
         dateFin : timesheetdata.dateFin , 
         description : timesheetdata.description , 
         status : timesheetdata.status ,
         totalduration : timesheetdata.totalduration, 
         lastupdate: timesheetdata.lastupdate,
         employe : timesheetdata.employe,
         jourTimesheets : []
    }; 
     

    obj.data.map((m:any) => { 
      m.week.map((d:any) => { 
         if(serverdata.jourTimesheets!.findIndex((e:any) => e.date == d.date) == -1 ){   
                  
                  serverdata.jourTimesheets!.push({ 
                     id : d.id ,  
                     date : d.date , 
                     phaseTimesheets : [ 
                         { 
                       'duration' : d.duration ,  
                       'description' : d.description ,   
                       'phase'  : m.phase
                         } 
                    ]
                  });
         }else{  
     
              let index = serverdata.jourTimesheets.findIndex((i:any) => i.date == d.date); 
              serverdata.jourTimesheets[index].phaseTimesheets.push({ 
                   'duration' : d.duration ,  
                   'description' : d.description ,   
                   'phase' :   m.phase
              }); 
 
         }
         
      });     
 
    });
 
     return  Object.assign({},serverdata) ; 


}