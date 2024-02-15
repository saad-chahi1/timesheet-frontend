import { PhaseType } from "./PhaseType"
import { Project } from "./Project"

export class Phase { 
    id!:string 
    dateDebut?:string   
    dateFin?:string 
    phaseType?:PhaseType 
    duree?:number
    project?:Project

}