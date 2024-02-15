import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { AddManagerDialogComponent } from 'src/app/usersmanagement/add-manager-dialog/add-manager-dialog.component';
import { EditManagerComponent } from 'src/app/usersmanagement/edit-manager/edit-manager.component';
import { Manager } from 'src/Models/Manager';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
  
  public managers:Manager[] = [];  
  public page:any = 1 ; 
  public pageSize:any = 10 ; 
  public loading:boolean = true ;  
  public searchvalue:String ; 

  constructor( 
    private dialog:MatDialog ,
    private userservice:UserService
  ) { }

  ngOnInit(): void { 
    this.userservice.getAllManagers().subscribe((resp:any)=>{ 
          this.managers = resp ;   
          this.loading = false ; 
          console.log(resp)
    },(err)=>{  
       this.loading = false ; 
       console.log(err)
    })
  }  

  openAddManager(){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;    
    dialogConfig.minWidth="40vw" ;

    const dialogref =  this.dialog.open(AddManagerDialogComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
              this.managers.push(result.data);
          }    

    })

  }

  enableAccount(id:string){ 
      
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment débloquer cet utilisateur ?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
    dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){ 
            this.userservice.enableAccount(id) 
            .subscribe((result) => { 
                 let i = this.managers.findIndex(o=> o.id==id); 
                 this.managers[i].enabled = true ;  
                
            }, err => { console.log(err)})
        }
      })
   }  
   
   disableAccount(id:string){ 

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment bloquer cet utilisateur ?" 

    } 
      const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
      dialogref.afterClosed().subscribe((result)=>{  
        if(result == true){ 
            this.userservice.disableAccount(id) 
            .subscribe((result) => { 
                 let i = this.managers.findIndex(o=> o.id==id); 
                 this.managers[i].enabled = false ; 
            }, err => { console.log(err)})
        }
      })
   } 

   exportExcel(){ 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');
   
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Nom', key: 'nom', width: 10 },
      { header: 'Adresse', key: 'adresse', width: 10 },
      { header: 'Date de Création', key: 'dateCreation', width: 10},
    ];
   
    this.managers.forEach(e => {
      worksheet.addRow({id: e.id , email : e.email , nom :e.nom , adresse :e.adresse , dateCreation : e.dateCreation },"n");
    }); 

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Gestionnaires.xlsx');
    })
   
  }
   

  exportPDF(){ 
    var pdf = new jsPDF();

    //pdf.setFontSize(2P);
    pdf.text('Gestionnaires', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    let header = [['ID','Email','Prénom','Nom','Adresse','Date de création']]
    let data:[][]=[]; 
    let index = 0 ; 
    this.managers.forEach((e) => { 
              let a:any = [index+1,e.email,e.prenom ,e.nom , e.adresse , e.dateCreation ]; 
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
    pdf.save('Gestionnaires-kbm-consulting.pdf');
  }


   deleteManager(id:string){ 
    
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimer cet gestionnaire ?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result === true){ 
               this.userservice.deleteUser(id) 
                .subscribe((data)=>{ 
                   this.managers = this.managers.filter((item)=> item.id != id);
                })
          }
    });
    
   } 

   updateManager(manager:Manager){  
     
    const dialogConfig = new MatDialogConfig(); 
     dialogConfig.disableClose = false ;
     dialogConfig.autoFocus = true ;   
     dialogConfig.data = {  
      user :  manager 
     }    
    const dialogref =  this.dialog.open(EditManagerComponent,dialogConfig);
    dialogref.afterClosed().subscribe((result)=>{  
         if(result){ 
            const index = this.managers.findIndex((obj)=>obj.id == manager.id); 
            this.managers[index] = result.data 
         }
    }) 
 
   }

   refresh(){ 
     this.ngOnInit();
   } 

   onSearchChange(value:string){  

   }
} 


