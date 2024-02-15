import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/Models/User';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Admins:User[],Value:string):User[] {
    
   

    if(!Admins || !Value){ 
        return Admins ; 
    } 

    return Admins.filter( admin => { 
       return  admin.email.toLowerCase().includes(Value.toLowerCase()) ||  admin.nom.toLowerCase().includes(Value.toLowerCase()) || admin.prenom.toLowerCase().includes(Value.toLowerCase())
      
      })
   
  }

}
