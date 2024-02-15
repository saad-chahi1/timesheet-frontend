import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ValueType } from 'exceljs';

import { Color, Label } from 'ng2-charts';
import { AuthService } from 'src/services/auth.service';
import { TimesheetService } from 'src/services/timesheet.service';

@Component({
  selector: 'app-yearreport',
  templateUrl: './yearreport.component.html',
  styleUrls: ['./yearreport.component.scss']
})
export class YearreportComponent implements OnInit { 
  
   public selected = -1 ;  

   public currentyear = new Date().getFullYear();

  public lineChartData: ChartDataSets[] = [
    {  
       data: [0,0,0,0,0,0,0,0,0,0,0,0], label: "Total des heures approuvées"  
    }
  
  ];
  public lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août','Septembre','Octobre','Novembre' ,'Décembre'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true, 
    maintainAspectRatio : false, 

    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  }; 

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgb(178, 224, 181)',
      borderColor: 'rgb(44, 109, 48)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private authservice:AuthService , private timesheetservice:TimesheetService ) {  

  }

  ngOnInit(): void {   
       this.retrievedata();
  } 
 


  retrievedata(){  
      
       this.timesheetservice.getReportByEmployeAndYear(this.authservice.getUserFromCache().id,this.currentyear.toString()) 
       .subscribe((resp:any)=>{ 
         this.setData(resp); 
         console.log(resp);
       },(err)=>{ 
          console.log(err);
       })

  }

  setData(data:any[]){  
    let initdata =  [0,0,0,0,0,0,0,0,0,0,0,0] ;
      data.map((v)=>{    
            
        if(v[2] == 0){ 

          let number = v[0] ;  
           var arr:any =v[1].split(':');
           let result = parseInt(arr[0]) + "." + parseInt(arr[1]); 
           let duration = parseFloat(result);  
        initdata[number-1] = duration ;

        }
             
      })  

      this.lineChartData[0].data  = initdata ; 

  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    
  }

  public chartHovered(e:any): void {
    if(e.active.length > 0) { 
      this.selected = e.active[0]._index ; 
    }else { 
      this.selected = -1 ; 
    }

  } 


  getSum(){  
      let sum = 0 ; 

      let newarray:any[]= this.lineChartData[0].data.slice(0,12)
    
      for(let i = 0 ; i < newarray.length ; i++){ 
   
         sum = sum + newarray[i];

      }  
       
       return sum.toFixed(2) ;  
  } 


  changecharttype(){ 
         this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line' ; 
  }


   
  

}
