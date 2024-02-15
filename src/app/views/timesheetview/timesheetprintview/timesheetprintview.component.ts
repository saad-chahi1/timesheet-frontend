import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import getPhaseTypeByName from 'src/app/helpers/getPhaseType';
import { TimesheetTableFormat } from 'src/Models/TimesheetTableFormat';

@Component({
  selector: 'app-timesheetprintview',
  templateUrl: './timesheetprintview.component.html',
  styleUrls: ['./timesheetprintview.component.scss']
})
export class TimesheetprintviewComponent implements OnInit {
  public weekdata:string[] = [] ;   
  public datatable:TimesheetTableFormat = { data : []}

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
       this.weekdata = data.weekdata ; 
       this.datatable = data.datatable ; 
   }

  ngOnInit(): void {
  } 
  getTotalTimesheetDuration(){  
    let count:string = "00:00"
    this.datatable.data!.filter((t) => { 
         t.week.filter((d:any)=>{ 
             count = this.addTimes(count,d.duration);
         })
    }) 

    return count ; 
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

  getPhaseName(phase:string){ 
    return getPhaseTypeByName(phase);
 }

  printview(){  
 
    const css = `<link rel="stylesheet" href="/printcss.css'" media="print" crossorigin="anonymous">`;
    const printContents = document.getElementById("print").innerHTML;
    const pageContent = `<!DOCTYPE html><html><head> 
        <style> 
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');  

        .ah{ 
            font-family: 'Roboto', sans-serif;
            font-size: 17px;
        } 
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');  
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); 
        @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        
        .nbt{ 
            font-family: 'Roboto', sans-serif; 
            font-size: 18px;
        }  
        
        .timesheetetat{ 
            
            font-family: 'Roboto', sans-serif; 
            font-size: 15px; 
            
           
        }     
        .wrapper { 
            font-family: 'Roboto', sans-serif;  
            font-size: 14px;
        }
        
        tr:nth-child(even) { 
             background-color: #e3eaec9f ; 
             border-radius: 5px;
             
        } 
        
        .th {
            color: #095d85;  
            font-family: 'Roboto', sans-serif;
        }
        
        .ds{ 
            font-size: 18px; 
            font-family: 'Open Sans', sans-serif;
        } 
        
        .timerwrapper{ 
        
            background-color: #26C281; 
            width: 100px; 
            font-size: 20px; 
            border-radius: 5px; 
            color: white;
        }
        
        
        .br {  
            border-radius: 10px; box-shadow : 0px 0px 19px -11px #000000 ;
            border-radius: 5px;
        }
        .status{  
        
             width: 100px; 
             padding: 7px;  
        }  
        
        .soum { 
            color: #fff;
            background-color: #36c6d3;
            border-color: #2bb8c4;
        }
        
        .save { 
            color: #FFF;
            background-color: #26C281;
            border-color: #26C281;
        }
        
        .miniteur { 
            background-color: #36c6d3; 
            color: white;
        } 
        
        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);  
            border-radius: 30px;
            
        } 
        
        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
            
        }    
        
        .trash { 
             color: rgb(87, 142, 190); 
             font-size: 18px;
        } 
        
        .pensqu { 
            color:  rgb(87, 142, 190) ;   
            font-size: 18px;
        }
        
        
        .PL{
            box-shadow: rgb(140 133 133) 0px 0px 5px;
            background-color: rgb(239, 239, 241);
            padding-top: 2.5px;
            padding-bottom: 5px;
            padding-left: 8px;
            width: 220px;
            border: 1px solid rgb(164, 173, 187) !important; 
        }
        
        .styled-table thead { 
            border-radius: 30px;
        }
        
        .styled-table thead tr { 
            
            background-color: #095d85;
            color: #ffffff;
            text-align: left; 
             
        }      
        
        .lu { 
            font-family: 'Roboto', sans-serif; 
            font-size: 15px;
        }
        
        .disablecontainer { 
            pointer-events: none ;
        } 
        
          th:nth-child(2) ,th:nth-child(3)  {
            border-left: solid 2px rgb(255, 255, 255); 
            border-right: solid 2px #ffffff;
           }  
        
           td:nth-child(2) , td:nth-child(3)  { 
              border-left: solid 2px #095d85; 
              border-right: solid 2px #095d85; 
              border-radius: 5px;
           } 
        
         
        
        .disabletd { 
            pointer-events: none; 
            background-color: rgb(219, 219, 219);
        }
        
        .timer { 
            border-radius: 5px;
        } 
        
          th { 
           text-align: center;
          } 
        
          td { 
              text-align: center;
          }
        
          td > input { 
           
              padding: 4px; 
              border-radius: 5px; 
              border: 1.5px solid #2bb8c4  ;
        } 
        
        
        @media screen and (max-width: 980px) { 
        
            .timesheetwrap { 
                overflow-x:auto;
            } 
            
          }
        </style>
       </head> 
       <body onload="window.print()"> 
       <h1 style="background-color: #095d85; color: white; marging-bottom : 20px;padding:10px;">Feuille de temps</h1>
        ${printContents} 
       </html>`;
    let popupWindow: Window;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      popupWindow = window.open(
        '',
        '_blank',
        'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
      );
      popupWindow.window.focus();
     
      popupWindow.document.write(pageContent);
        popupWindow.document.close();
      popupWindow.onbeforeunload = event => {
        popupWindow.close();
      };
      popupWindow.onabort = event => {
        popupWindow.document.close();
        popupWindow.close();
      };
    } else {
      popupWindow = window.open('', '_blank', 'width=600,height=600');
      popupWindow.document.open();
      popupWindow.document.write(pageContent);
      popupWindow.document.close();
    }

} 

}
