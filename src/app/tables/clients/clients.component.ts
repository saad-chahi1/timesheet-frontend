import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddclientComponent } from 'src/app/clientsmanagement/addclient/addclient.component';
import { EditclientComponent } from 'src/app/clientsmanagement/editclient/editclient.component';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { Client } from 'src/Models/Client';
import { ClientService } from 'src/services/client.service';  
import  jsPDF from 'jspdf';
import 'jspdf-autotable'; 

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ClientprojectsviewComponent } from 'src/app/clientsmanagement/clientprojectsview/clientprojectsview.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  public clients:Client[];  
  public page:any = 1 ; 
  public pageSize:any = 8  ;
  public loading:boolean = false;  
  public searchvalue:string ; 
  constructor( 
    private clientservice:ClientService , 
    private dialog:MatDialog
  ) { 
      this.clients = []; 
   } 
  ngOnInit(): void {  
      this.getClients();
     
  }   

  getClients(){ 
    this.loading = true ; 
    this.clientservice.getClients().subscribe 
    ((resp:any) =>{  
           this.clients = resp  ;  
           this.loading = false ;  
    }, 
     (err) => {  
           this.loading = false ; 
           console.log(err);
     }
    )

  }
  onSearchChange(value:string){ 



  }  

  onUpdateClient(client:Client){  

     const dialogConfig = new MatDialogConfig(); 
     dialogConfig.disableClose = false 
     dialogConfig.autoFocus = true 
     dialogConfig.minWidth = "50vw"
     dialogConfig.data = { user : client }  
     const dialogref =  this.dialog.open(EditclientComponent ,dialogConfig)
     dialogref.afterClosed().subscribe((result)=>{  
         if(result){  
            const index = this.clients.findIndex((obj)=>obj.id == client.id)
            this.clients[index] = result.data 
         }
    }) 
   
  } 


  openClientProjects(clientid:string){ 
      
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.minWidth = "60vw" ;    
    dialogConfig.minHeight = "60vh"  



    dialogConfig.data = { clientid : clientid }

    const dialogref =  this.dialog.open( ClientprojectsviewComponent , dialogConfig );   

  }

  
  
  OpenAddClient(){ 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.minWidth = "50vw" ; 

    const dialogref =  this.dialog.open(AddclientComponent,dialogConfig); 
    dialogref.afterClosed().subscribe((result:any)=>{ 
          if(result){  
              this.clients.push(result.data);
          }    
    })
  } 
      
  Refresh(){ 
   // this.ngOnInit(); 
   this.getClients()
  } 

  deleteClient(id:string){  

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;   
    dialogConfig.data = {  
      title : "Confirmation" ,
      message : "Voulez-vous vraiment supprimer ce client ?" 

    } 
    const dialogref =  this.dialog.open(ConfirmModalComponent,dialogConfig);  
    dialogref.afterClosed().subscribe((result)=>{ 
          if(result === true){ 
               this.clientservice.deleteClient(id) 
                .subscribe((data)=>{  
                   this.clients = this.clients.filter((item)=> item.id !== id);
                },(err) => console.log(err))
          }
    });

  } 

  savepdf(){ 
     
    var pdf = new jsPDF();

    //pdf.setFontSize(2P);
    pdf.text('Clients', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    let header = [['ID', 'Nom du client', 'Email', 'Pays' , 'Téléphone' , 'Charge consommée ( Heures )']]
    let data:[][]=[]; 
    let index = 0 ; 
    this.clients.forEach((e) => { 
              let a:any = [index+1,e.nom_client,e.email,e.pays,e.phone_num ,this.getCharge(e['hours']) ]; 
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
    pdf.save('clients-kbm-consulting.pdf');

   
  }  



  getCharge(values:string[]){ 
       
    let sum = "00:00" ; 
    values.map((v)=>{ 
        sum = this.addTimes(sum,v)
    }) 
    
    let p = sum.split(":");


    return p[0]+"."+p[1] ; 

      
  }


  exportexcel(tableiid:string):void{ 
      
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');
   
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Nom du client', key: 'name', width: 32 },
      { header: 'Email', key: 'email', width: 10 },
      { header: 'Pays', key: 'pays', width: 10 },
      { header: 'Téléphone', key: 'telephone', width: 10},
    ];
   
    this.clients.forEach(e => {
      worksheet.addRow({id: e.id, name: e.nom_client, email:e.email,pays:e.pays , telephone : e.phone_num },"n");
    }); 

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Clients.xlsx');
    })
   

  }  

  addTimes (startTime:any, endTime:any) {
    var times = [ 0, 0]
    var max = times.length
    
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
    
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    } 
    
    
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
    
    var hours = times[0]
    var minutes = times[1]
    
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
    
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
    }  
  


}

export const clientlist:Client[] = [ 
  {  
     id : "ATRATUZYAZYUAZAIUA" , 
     email : "talhimohammed506@gmail.com" , 
     nom_client : "nespresson" , 
     pays : "Maroc" ,
     phone_num : "+212659884493" 
  } , 
  {  
    id : "ATRATUZYAZYUAZAIUA" , 
    email : "talhimohammed506@gmail.com" , 
    nom_client : "nespresson" , 
    pays : "Maroc" ,
    phone_num : "+212659884493" 
  } , 
  {  
  id : "ATRATUZYAZYUAZAIUA" , 
  email : "talhimohammed506@gmail.com" , 
  nom_client : "nespresson" , 
  pays : "Maroc" ,
  phone_num : "+212659884493" 
  }
]  

  


