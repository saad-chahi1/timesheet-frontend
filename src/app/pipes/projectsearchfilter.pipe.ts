import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/Models/Project';

@Pipe({
  name: 'projectsearchfilter'
})
export class ProjectsearchfilterPipe implements PipeTransform {

  transform(Projects:Project[],Value:String):Project[] {
    if(!Projects || !Value){ 
      return Projects ; 
  }  

  return Projects.filter( project => { 
     return  project.nom.toLowerCase().includes(Value.toLowerCase()) || project.client.nom_client.toLowerCase().includes(Value.toLowerCase()) 
    
    })
  }

}
