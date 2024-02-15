import { Pipe, PipeTransform } from '@angular/core';
import { Client } from 'src/Models/Client';

@Pipe({
  name: 'clientsearch'
})
export class ClientsearchPipe implements PipeTransform {

  transform(Clients:Client[ ],Value:String): Client[] {
    
    if(!Clients || !Value){ 
      return Clients ; 
  } 

  return Clients.filter( client => { 
     return  client.email.toLowerCase().includes(Value.toLowerCase()) ||  client.nom_client.toLowerCase().includes(Value.toLowerCase()) 
    
    })
  }

}
