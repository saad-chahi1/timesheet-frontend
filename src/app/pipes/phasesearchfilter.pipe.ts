import { Pipe, PipeTransform } from '@angular/core';
import { Phase } from 'src/Models/Phase';

@Pipe({
  name: 'phasesearchfilter'
})
export class PhasesearchfilterPipe implements PipeTransform {

  transform(Phases:Phase[],Value:String): Phase[] {
    if(!Phases || !Value){ 
      return Phases ; 
  }  

  return Phases.filter( phase => {  
     let phasename = ""; 

     switch(phase.phaseType.toString()){ 
       case 'CADRAGE' :  
          phasename = "cadrage"
          break ;   
       case 'CONCEPTION' :  
          phasename = "conception"
          break ;  
       case 'ANALYSE' : 
          phasename = "analyse" ;  
          break ; 
       case 'CLOTURE' : 
         phasename = "clôture" ;     
          break ; 
       case 'REALISATION' : 
          phasename = "réalisation" ;     
           break ;         
       case 'TEST' : 
           phasename = "test" ;     
            break ;
       case 'DEPLOIMENT' : 
            phasename = "déploiment" ;     
             break ;  
       case 'PLANIFICATION' : 
             phasename = "planification" ;     
              break ;              

     }
     
     return  phasename.toLowerCase().includes(Value.toLowerCase()) 
    
    })
  }

}
