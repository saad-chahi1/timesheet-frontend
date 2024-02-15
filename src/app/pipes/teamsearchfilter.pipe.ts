import { Pipe, PipeTransform } from '@angular/core';
import { Employe } from 'src/Models/Employe';

@Pipe({
  name: 'teamsearchfilter'
})
export class TeamsearchfilterPipe implements PipeTransform {

  transform(Employes:Employe[],Value:String): Employe[] {
    if(!Employes || !Value){ 
      return Employes ; 
  }  

  return Employes.filter( employe => { 
     return  employe.nom.toLowerCase().includes(Value.toLowerCase()) || employe.prenom.toLowerCase().includes(Value.toLowerCase()) || employe.email.toLowerCase().includes(Value.toLowerCase())  
    
    })
  }
  }


