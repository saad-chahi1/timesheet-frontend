import { Pipe, PipeTransform } from '@angular/core';
import { Employe } from 'src/Models/Employe';

@Pipe({
  name: 'employesearchfilter'
})
export class EmployesearchfilterPipe implements PipeTransform {

  transform(Employes:Employe[],Value:String):Employe[] {
     
    if(!Employes || !Value){ 
      return Employes ; 
  } 

  return Employes.filter( employe => { 
     return  employe.email.toLowerCase().includes(Value.toLowerCase()) ||  employe.nom.toLowerCase().includes(Value.toLowerCase()) || employe.prenom.toLowerCase().includes(Value.toLowerCase())
    
    })
  }

}
