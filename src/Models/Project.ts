import { Client } from "./Client"
import { Employe } from "./Employe"
import { Phase } from "./Phase"
import { ProjectDocument } from "./ProjectDocument"
import { Projectstatus } from "./Projectstatus"

export class Project { 
     
     id!:string 
     nom!:string 
     dateDebut!:string
     dateFin!:string 
     coutestim!:string 
     description!:string
     equipe!:Employe[]
     type!:string 
     status!:Projectstatus  
     client!:Client
     phases!:Phase[]
     projectDocuments!:ProjectDocument[]  
     duree?:number 

}