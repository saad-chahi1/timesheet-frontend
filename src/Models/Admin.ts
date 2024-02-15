import { User } from "./User";

export class Admin implements User  {  

    id?: string;  
    username!: string; 
    password?: string 
    email!: string; 
    adresse!: string;  
    nom!: string; 
    prenom!: string;  
    numeroTele!: string;  
    dateCreation!: string;  
    enabled!: boolean; 

}  
