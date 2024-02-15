import { Employe } from "./Employe"
import { Phase } from "./Phase"

export class Affectation { 
    id!:string
    status?:string
    phase?:Phase 
    employe?:Employe 
    dateFinPrevue?:string 
    descriptionTaches?:string  
    dateAffectation?:string
}