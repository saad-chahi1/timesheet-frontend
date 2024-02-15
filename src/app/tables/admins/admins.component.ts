import { Component, OnInit , AfterViewInit } from '@angular/core';  
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';  
import { User } from 'src/Models/User'; 
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AddAdminaDialogComponent } from 'src/app/usersmanagement/add-admina-dialog/add-admina-dialog.component';
import { UserService } from 'src/services/user.service';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { Admin } from 'src/Models/Admin';
import { AdminprofileComponent } from 'src/app/profiles/adminprofile/adminprofile.component';
import { ClientService } from 'src/services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs'; 
import jsPDF from 'jspdf';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
}) 

export class AdminsComponent implements OnInit {
   
  public admins:User[] = [];   
  public page:any = 1; 
  public pageSize:any = 10;
  public loading:boolean = true ; 
  public formGroup:FormGroup ;   
  public searchvalue:string ;

  constructor( 
    private dialog:MatDialog , 
    private userservice:UserService , 
    private formBuilder: FormBuilder
  ) { 
    this.formGroup = formBuilder.group({ filter: [''] });
   
  }

  ngOnInit(): void { 
   this.getAdmins(); 
  }  


  getAdmins(){  
    this.loading = true ; 
    this.userservice.getAllAdmins().subscribe( 
      (data:any)=>{ 
          this.admins = data ;
          this.loading = false ;   
      },(err)=>{  
          this.loading = false ; 
          console.log(err) 
      });   
  }

  onSearchChange(value:string){  
      
       if(value == ""){  
          this.ngOnInit(); 
       }else if( value !== ""){       
          if(this.admins.length == 0){ 
             this.ngOnInit(); 
             console.log("admins lengh 0");
          }else{
         this.admins = this.admins.filter((res:User)=>{   
          if(res.email && res.nom && res.prenom){ 
            return (   
               
              res.email.trim().toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()) 
              || 
              res.nom.trim().toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())
              ||
              res.prenom.trim().toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())  
             )
          } 
           return false ; 
         })  
        }   
       }

  }  

  Refresh(){ 
    this.ngOnInit();
  }  

  

  DeleteAdmin(id:string){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimer cet administateur ?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result === true){ 
               this.userservice.deleteUser(id) 
                .subscribe((data)=>{ 
                   this.admins = this.admins.filter((item)=> item.id != id);
                })
          }
    });
            
  } 

  savepdf(){ 
     
    var pdf = new jsPDF();

    //pdf.setFontSize(2P);
    pdf.text('Administrateurs', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    let header = [['ID','Email','Prénom','Nom','Adresse','Date de création']]
    let data:[][]=[]; 
    let index = 0 ; 
    this.admins.forEach((e) => { 
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
    pdf.save('Administrateurs-kbm-consulting.pdf');

   
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
   
    this.admins.forEach(e => {
      worksheet.addRow({id: e.id , email : e.email , nom :e.nom , adresse :e.adresse , dateCreation : e.dateCreation },"n");
    }); 

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Administrateurs.xlsx');
    })
   
  }

  OpenAddAdmin(){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;    
    dialogConfig.minWidth="40vw"


    const dialogref =  this.dialog.open(AddAdminaDialogComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result){  
              this.admins.push(result.data);
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
                 let i = this.admins.findIndex(o=> o.id==id); 
                 this.admins[i].enabled = true ;  
                
            }, err => { console.log(err)})
        }
      })
   }  

   updateuser(user:User){ 
     const dialogConfig = new MatDialogConfig(); 
     dialogConfig.disableClose = false ;
     dialogConfig.autoFocus = true ;   
     dialogConfig.data = {  
      type : "UPDATE" ,
      user : user 
     }    
    const dialogref =  this.dialog.open(AdminprofileComponent,dialogConfig);
    dialogref.afterClosed().subscribe((result)=>{  
         if(result){ 
            const index = this.admins.findIndex((obj)=>obj.id == user.id); 
            this.admins[index] = result.data 
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
                 let i = this.admins.findIndex(o=> o.id==id); 
                 this.admins[i].enabled = false ; 
            }, err => { console.log(err)})
        }
      })
   }
} 

export const adminlist:User[] = [  
  { 
    id : "TATATATTQG" ,  
    password : "" , 
    username : "talhimohammoed" ,
    email : "talhimohammed507@gmail.com" , 
    adresse : "Casablanca" , 
    nom : "TALHI" , 
    prenom : "Mohammed" , 
    numeroTele : "+212659884493" , 
    dateCreation : "2021-07-11" , 
    enabled : true , 
   
  }  ,
  { 
    id : "TATATATTQG" ,  
    password : "" , 
    username : "saidekaki" ,
    email : "said@gmail.com" , 
    adresse : "rabat" , 
    nom : "dekaki" , 
    prenom : "Said" , 
    numeroTele : "+212659884493" , 
    dateCreation : "2021-07-11" , 
    enabled : false
  }  , 
  { 
    id : "TATATATTQG" ,  
    password : "" , 
    username : "saidekaki" ,
    email : "said@gmail.com" , 
    adresse : "rabat" , 
    nom : "dekaki" , 
    prenom : "Said" , 
    numeroTele : "+212659884493" , 
    dateCreation : "2021-07-11" , 
    enabled : false } , 

    { 
      id : "TATATATTQG" ,  
      password : "" , 
      username : "saidekaki" ,
      email : "said@gmail.com" , 
      adresse : "rabat" , 
      nom : "dekaki" , 
      prenom : "Said" , 
      numeroTele : "+212659884493" , 
      dateCreation : "2021-07-11" , 
      enabled : false }


]
