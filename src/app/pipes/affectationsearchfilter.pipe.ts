import { Pipe, PipeTransform } from '@angular/core';
import { Affectation } from 'src/Models/Affectation';

@Pipe({
  name: 'affectationsearchfilter'
})
export class AffectationsearchfilterPipe implements PipeTransform {

  transform(Affectations:Affectation[] , Value:String ): Affectation[] {
    if(!Affectations || !Value){ 
      return Affectations ; 
    } 
    
    return Affectations.filter( affectation => {  
      
      let phasename = ""; 

     switch(affectation.phase.phaseType.toString()){ 
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

      return  affectation.employe.nom.toLowerCase().includes(Value.toLowerCase()) ||  affectation.employe.prenom.toLowerCase().includes(Value.toLowerCase()) || phasename.toLowerCase().includes(Value.toLowerCase())  
     
     })


  }

}
