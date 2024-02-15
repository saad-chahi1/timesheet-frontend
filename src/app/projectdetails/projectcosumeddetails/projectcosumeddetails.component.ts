import { ErrorHandler } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { ProjectService } from 'src/services/project.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-projectcosumeddetails',
  templateUrl: './projectcosumeddetails.component.html',
  styleUrls: ['./projectcosumeddetails.component.scss']
})
export class ProjectcosumeddetailsComponent implements OnInit { 

  public projectid:string ;
  public dataa:any[] = [] ; 
  public exceldata:any[] = [] ;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private projectservice:ProjectService) {  

    this.projectid = data.projectid ; 
  }

  ngOnInit(): void { 
    this.projectservice.getProjectConsumedDetail(this.projectid) 
        .subscribe((resp:any)=>{ 
                 this.exceldata = resp ;
                 this.dataa =  this.changeFormat(resp);

        },(err)=>{console.log(err)})
  }

  changeFormat(resp){         
      let newdat:any[] = [] 
      resp.map((va)=>{ 
         let phase = va[0]; 
         let index = newdat.findIndex( v => v.phase == phase); 
         if(index >= 0){
              newdat[index].result.push([va[1],va[2],va[3]])    
         }else{  
              newdat.push({phase : phase , result : [[va[1],va[2],va[3]]]})
         }
      }) 
      return newdat ; 
  }

  exportExcel(){ 
  
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');
   
    worksheet.columns = [
      { header: 'phase', key: 'phase', width: 10 },
      { header: 'consultant', key: 'consultant', width: 20 },
      { header: 'temps consommé', key: 'temps', width: 40 },
      { header: 'Descriptions', key: 'descriptions', width: 80 },
  
    ];
   
    this.exceldata.forEach(e => {
      worksheet.addRow({phase : e[0] , consultant :e[1] , temps : e[2] , descriptions : e[3]  },"n");
    });  
    let i = 0 ; 
    this.dataa.map((v,index)=>{ 

       let length = v.result.length ;   
       let start = index + 2 ; 
       let end  = start + ( length - 1 ) ;   
       worksheet.mergeCells('A'+start+':A'+end);
      
    })
     
    //worksheet.mergeCells('A3:A4'); 


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'RAPPORT.xlsx');
    })
   
  }

}
