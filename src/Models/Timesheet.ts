import { Employe } from "./Employe";
import { jourTimesheets } from "./JourTimesheets";
import { TimesheetStatus } from "./TimesheetStatus";

export class timesheet {  
    id?:string  
    dateDebut?:string
    dateFin?:string 
    description?:string
    jourTimesheets?:jourTimesheets[];  
    totalduration?:string 
    lastupdate?:string 
    employe?:Employe 
    rejectedBy?:string 
    approuvedBy?:string 
    approuvedAt?:string 
    rejectedAt?:string 
    raisonRejection?:string
    status?:TimesheetStatus 
}