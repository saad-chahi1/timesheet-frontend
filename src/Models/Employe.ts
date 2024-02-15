import { from } from "rxjs";
import { User } from "./User";  
import { EmployeType } from "./EmployeType" ; 


export class Employe implements User {  

    id!: string;  
    username?: string; 
    password?: string 
    email?: string; 
    adresse?: string;  
    nom?: string; 
    prenom?: string;  
    numeroTele ?: string;  
    dateCreation ?: string;   
    enabled ?: boolean; 
    dateembauche ?:Date; 
    profession ?:string; 
    fullName ?:string;
    typeEmploye ?:EmployeType ;

}