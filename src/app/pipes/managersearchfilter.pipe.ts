import { Pipe, PipeTransform } from '@angular/core';
import { Employe } from 'src/Models/Employe';
import { Manager } from 'src/Models/Manager';

@Pipe({
  name: 'managersearchfilter'
})
export class ManagersearchfilterPipe implements PipeTransform {

  transform(Managers:Manager[],Value:String):Manager[] {
    if(!Managers || !Value){ 
      return Managers ; 
  }  



  return Managers.filter( manager => { 
     return  manager.email.toLowerCase().includes(Value.toLowerCase()) || manager.nom.toLowerCase().includes(Value.toLowerCase()) || manager.prenom.toLowerCase().includes(Value.toLowerCase())
    
    })
  }

}
