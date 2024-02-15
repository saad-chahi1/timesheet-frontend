import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { AddEmployeDialogComponent } from 'src/app/usersmanagement/add-employe-dialog/add-employe-dialog.component';
import { EditEmployeComponent } from 'src/app/usersmanagement/edit-employe/edit-employe.component';
import { Employe } from 'src/Models/Employe';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {  

  public employes:Employe[] = [];  
  public page:any = 1 ; 
  public pageSize:any = 10 ; 
  public loading:boolean = true ;  
  public searchvalue:string ;

  constructor(
    private dialog:MatDialog , 
    private userservice:UserService
  ) { }

  ngOnInit(): void { 
    this.userservice.getAllEmployes().subscribe((resp:any)=>{ 
       this.employes = resp ; 
       this.loading = false ;  
    },(err)=>{  
       this.loading = false ; 
       console.log(err);
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
                 let i = this.employes.findIndex(o=> o.id==id); 
                 this.employes[i].enabled = false ; 
            }, err => { console.log(err)})
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
                 let i = this.employes.findIndex(o=> o.id==id); 
                 this.employes[i].enabled = true ;  
                
            }, (err) => { console.log(err)})
        }
      })
   } 
   
   
   exportPDF(){ 
    var pdf = new jsPDF();

    //pdf.setFontSize(2P);
    pdf.text('Consultants', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    let header = [['ID','Email','Prénom','Nom','Adresse','Date de création' , 'Profession' , "Date d'embauche"]]
    let data:[][]=[]; 
    let index = 0 ; 
    this.employes.forEach((e) => { 
              let a:any = [index+1,e.email,e.prenom ,e.nom , e.adresse , e.dateCreation , e.profession , e.dateembauche ]; 
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
    pdf.save('Consultants-kbm-consulting.pdf');
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
      { header: 'Profession', key: 'profession', width: 10}, 
      { header: "Date d'embauche", key: 'dateEmbauche', width: 10},
    ];
   
    this.employes.forEach(e => {
      worksheet.addRow({id: e.id , email : e.email , nom :e.nom , adresse :e.adresse , dateCreation : e.dateCreation , Profession : e.profession , dateEmbauche : e.dateembauche },"n");
    }); 

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Consultants-KBM.xlsx');
    })
   
  }

  
   deleteEmploye(id:string){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimer cet employé ?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result === true){ 
               this.userservice.deleteUser(id) 
                .subscribe((data)=>{ 
                   this.employes = this.employes.filter((item)=> item.id != id);
                })
          }
    });

   } 

   updateEmploye(user:Employe){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw"
    dialogConfig.maxHeight = "90vh"
    dialogConfig.data = { user : user }    
    const dialogref =  this.dialog.open(EditEmployeComponent,dialogConfig);
    dialogref.afterClosed().subscribe((result)=>{  
        if(result){ 
           const index = this.employes.findIndex((obj)=>obj.id == user.id); 
           this.employes[index] = result.data 
        }
   }) 

   } 

   openAddEmploye(){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = false ;    
    dialogConfig.minWidth = "50vw"
    dialogConfig.maxHeight = "90vh"

    const dialogref =  this.dialog.open(AddEmployeDialogComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
              this.employes.push(result.data);
          }    
    })
   }  

   onSearchChange(value:string){ 

   }

   refresh(){ 
      this.ngOnInit();
   }
 
}
