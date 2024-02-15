import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentsearchfilter'
})
export class DocumentsearchfilterPipe implements PipeTransform {

  transform(Documents:any[],Value:String):any[] {
    if(!Documents || !Value){ 
      return Documents ; 
  } 

  return Documents.filter( document => { 
     return  document.nom.toLowerCase().includes(Value.toLowerCase()) 
    })
  }

}
