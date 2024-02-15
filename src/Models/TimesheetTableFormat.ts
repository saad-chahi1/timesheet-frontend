import { Employe } from "./Employe"

export class TimesheetTableFormat {  

   id?:string  
   dateDebut?:string 
   dateFin?:string 
   description?:string 
   status?:string  
   totalduration?:string 
   lastupdate?:string
   data?:any[] 
   employe?:Employe  
   rejectedBy?:string 
   approuvedBy?:string 
   approuvedAt?:string 
   rejectedAt?:string 
   raisonRejection?:string
  


   



   
}