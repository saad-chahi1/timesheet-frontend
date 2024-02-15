import { User } from "./User";

export class Manager implements User { 
    id!: string;  
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