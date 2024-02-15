import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-projectpiechart',
  templateUrl: './projectpiechart.component.html',
  styleUrls: ['./projectpiechart.component.scss']
})
export class ProjectpiechartComponent implements OnInit  {

   

    @Input() 
    set conso(value:string) {
      this.consoV = value ;  
      this.setData(this.totalV,this.consoV);
  
    }

    @Input() 
    set total(value:number) {
      this.totalV = value ;  
      this.setData(this.totalV,this.consoV);
    }  


    public totalV:number = 0 ;  
    public consoV:string = "00:00"  ; 

    
  public pieChartOptions: ChartOptions = {
    responsive: true, 
  }; 

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#578ebe', '#c4d9eb']
    //borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
 }]; 
 
  public pieChartLabels: Label[] = ['% Charge Consommée', '% Reste à consommer'];
  public pieChartData: SingleDataSet = [] ;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
     
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();    


  }

  ngOnInit(): void {} 
 
  
   convert(conso:string){ 
       var arr:any =conso.split(':');
       let result = parseInt(arr[0]) + "." + parseInt(arr[1]); 
       let c = parseFloat(result); 
       return c ;
  }

  ngOnChanges(changements: SimpleChanges) {
  

  }

  setData(total,conso){ 
 
    let consomme = this.convert(conso) ; 
    if(consomme > total){ 
            this.pieChartData  = [100,0];
           
    }else{ 
                 
     let donepercent = (consomme/total)*100 ; 
     let remain     = 100 - donepercent ; 
     
     this.pieChartData = [ donepercent , remain ]
  }
}

 

}
