import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { Project } from 'src/Models/Project';
import { ProjectDocument } from 'src/Models/ProjectDocument';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
   
  @Input() project!:Project ;  
  
  @Output() delete:EventEmitter<any> = new EventEmitter(); 
  
  public searchvalue:string ; 

  public page:any = 1 ; 
   public pageSize:any = 5 ; 

  constructor(
      private notification:notification , 
      private projectservice:ProjectService , 
      private dialog:MatDialog
  ) {  


  }

  ngOnInit(): void { 
        
  }  



  deletedocument(id:string){  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimmer ce document?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{  
      if(result == true){   
               this.projectservice.deleteDocument(this.project.id,id)
                                  .subscribe((resp:any)=>{ 
                                          if(resp.STATUS == 200){ 
                                             this.notification.shownotification("la piéce jointe a été supprimée","Annuler","SUCCESS")
                                             this.delete.emit(id);
                                          }else { 
                                            console.log("Error")
                                          }
                                  },(err)=>{ 
                                    console.log(err)
                                  })

      } 
    })

  } 
  
  downloadpdf(document){ 
    //   console.log(document.data.length)
   //  this.saveByteArray("test", this.saveByteArray( document.nom , this.base64ToArrayBuffer(document.data)));
 
   const arrayBuffer = this.base64ToArrayBuffer(document.data) 
   this.createAndDownloadBlobFile(arrayBuffer,document.nom);
  }
   

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  createAndDownloadBlobFile(body, filename, extension = 'pdf') {
    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
 
   
/*
    saveByteArray(reportName, byte) {
     var blob = new Blob([byte], {type: "application/pdf"});
     var link = document.createElement('a');
     link.href = window.URL.createObjectURL(blob);
     var fileName = reportName;
     link.download = fileName;
     link.click();
}; */

}
