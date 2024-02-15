import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.scss']
})
export class AdddocumentComponent implements OnInit {
  
  files: File[] = [] ;   
  isLoading:boolean = false ;  
  projectid:string ;

  constructor( 
    public dialogref:MatDialogRef<AdddocumentComponent> , 
    @Inject(MAT_DIALOG_DATA) public data:any , 
    public projectservice:ProjectService , 
    public notification:notification
    ) {  

         this.projectid = data.projectid ;
      } 
  ngOnInit(): void { 

  }   
  adddocuments(){  
         this.isLoading = true ; 
         this.projectservice.adddocumentstoproject(this.projectid,this.files) 
                            .subscribe((result:any)=>{ 
                                       if(result.STATUS ==  200){ 
                                          this.notification.shownotification("Vos fichiers ont été bien enregistré","Annuler","SUCCESS")
                                          this.dialogref.close({data: result.RESPONSE.projectDocuments}) 
                                        }else{ 
                                         console.log("Internal Error")
                                        } 
                                       this.isLoading = false ; 
                            },(err)=>{ console.log(err); this.isLoading = false ;})
  }

  onSelect(event:any) {   

    this.files.push(...event.addedFiles);  
    const formData = new FormData();  
    for (var i = 0; i < this.files.length; i++) {   
      formData.append("files", this.files[i]);  
    }  

  } 
  
  onRemove(event:any) {   
    this.files.splice(this.files.indexOf(event), 1);  
}    


Annuler(){ 
  this.dialogref.close()
}

}
