import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { AddProjectComponent } from 'src/app/projectmanagement/add-project/add-project.component';
import { UpdateProjectComponent } from 'src/app/projectmanagement/update-project/update-project.component';
import { Project } from 'src/Models/Project';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit { 

  public page:any = 1 ; 
  public pageSize:any = 10 ;  
  public projects:Project[] = []; 
  public loading:boolean = false ; 
  public searchvalue:string; 
  

  constructor( 
    private dialog:MatDialog , 
    private projectservice:ProjectService ,  
    private notification:notification


  ) { }

  ngOnInit(): void { 

     this.getProjects();  
     

  }  


  getProjects(){  
    this.loading = true ;   
 
      this.projectservice.getprojects().subscribe((resp:any)=>{   
        this.loading = false ; 
        this.projects = resp ;           
      },err =>{ 
        this.loading = false ;  
        console.log(err)
      })

    
  }

  onUpdateProject(project:Project){  
     
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false 
    dialogConfig.autoFocus = false 
    dialogConfig.minWidth = "50vw" ; 
    dialogConfig.maxHeight = "90vh" ;
    dialogConfig.data = { project : project }  
    const dialogref =  this.dialog.open(UpdateProjectComponent,dialogConfig)
    dialogref.afterClosed().subscribe((result)=>{  
        if(result){  
          const index = this.projects.findIndex((obj)=>obj.id == project.id)
           this.projects[index] = result.data 
        }
   })

  } 

  exportExcel(){ 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');
   
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Nom du projet', key: 'nomp', width: 32 },
      { header: 'Nom du client', key: 'nomc', width: 10 },
      { header: 'Statut', key: 'statut', width: 10 },
      { header: 'Équipe', key: 'equipe', width: 10},
    ];
   
    this.projects.forEach(e => { 
     
      let status:string = "" ; 
      switch(e.status.toString()){ 
    
          case "EN_COURS" : 
           status = "En cours" 
           break;   

          case "TERMINE" :
           status = "Terminé"  
           break ; 
          
          case "TERMINE_EN_RETARD" :
            status = "Terminé en retard"  
            break ;   

          case "ANNULE" :
            status = "Annulé"  
            break ;      
      } 

      //team 
      let team:string = "";
      e.equipe.forEach((e)=> { 
          team += e.nom+" "+e.prenom+","
      })

      worksheet.addRow({id: e.id , nomp : e.nom , nomc :e.client.nom_client , statut : status , equipe : team  },"n");
    }); 

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Projects.xlsx');
    })
   
  }
   

  exportPDF(){ 
    var pdf = new jsPDF();

    //pdf.setFontSize(2P);
    pdf.text('Projets', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    let header = [['ID','Nom du projet','Nom du client','Statut',"Équipe"]]
    let data:[][]=[]; 
    let index = 0 ; 
    this.projects.forEach((e) => {  

      let status:string = "" ; 
      switch(e.status.toString()){ 
    
          case "EN_COURS" : 
           status = "En cours" 
           break;   

          case "TERMINE" :
           status = "Terminé"  
           break ; 
          
          case "TERMINE_EN_RETARD" :
            status = "Terminé en retard"  
            break ;   

          case "ANNULE" :
            status = "Annulé"  
            break ;      
      } 

      //team 
      let team:string = "";
      e.equipe.forEach((e)=> { 
          team += e.nom+" "+e.prenom+","
      })
        
              let a:any = [index+1,e.nom , e.client.nom_client , status , team ]; 
              data.push(a);
    })

    let tableData = [
        [1, 'John', 'john@yahoo.com', 'HR'],
        [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    
        
    ];

    (pdf as any).autoTable({
    head:   header,
    body:   data,
    theme: 'plain',
    didDrawCell: (data:any) => {
        console.log(data.column.index)
    }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('Projets-kbm-consulting.pdf');
  }

  



  onSearchChange(value:string){ 

  }  

  OpenAddProject(){  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw" ;
    dialogConfig.maxHeight = "90vh" ;

    const dialogref =  this.dialog.open(AddProjectComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
              this.projects.push(result.data); 
              console.log(this.projects);
          }    
    })

  }  


  DeleteProject(id:string){ 
      
      const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ;   
      dialogConfig.data = {  
        title : "Confirmation" ,
        message : "Voulez-vous vraiment supprimmr ce projet ?" 
  
      } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){ 
            this.projectservice.deleteProject(id) 
               .subscribe((resp:any)=>{ 
                this.projects = this.projects.filter((item)=> item.id != id); 
                this.notification.shownotification("le projet a été supprimé","Annuler","SUCCESS")
               },(err)=>{ 
                 console.log(err);
               })
        } 
      })

  }
  
  ArchiveProject(id:string){ 
     
    const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = false ;
      dialogConfig.autoFocus = true ;   
      dialogConfig.data = {  
        title : "Confirmation" ,
        message : "Voulez-vous vraiment archiver ce projet ?" 
  
      } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig); 
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){ 
            this.projectservice.archiveproject(id) 
               .subscribe((resp:any)=>{ 
                this.projects = this.projects.filter((item)=> item.id != id); 
                this.notification.shownotification("le projet a bien été archivé","Annuler","SUCCESS")
               },(err)=>{ 
                 console.log(err);
               })
        } 
      })
  }

  Refresh(){ 
    this.getProjects()
  }

} 
const projects:any[] = [ 
    { 
       nom : "E-COMMMERCE PROJECT" , 
       client : "SQLI" , 

     } , 
     { 
      nom : "E-COMMMERCE PROJECT" , 
      client : "IBM" , 
      
    } , 
    { 
      nom : "E-COMMMERCE PROJECT" , 
      client : "IBM" , 
      
    } ,
    { 
      nom : "E-COMMMERCE PROJECT" , 
      client : "SQLI" , 
      
    }  

]
