import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Client } from 'src/Models/Client';
import { Employe } from 'src/Models/Employe';
import { AuthService } from 'src/services/auth.service';
import { ClientService } from 'src/services/client.service';
import { ProjectService } from 'src/services/project.service';
import { TimesheetService } from 'src/services/timesheet.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-employesreport',
  templateUrl: './employesreport.component.html',
  styleUrls: ['./employesreport.component.scss']
})
export class EmployesreportComponent implements OnInit {
  
  selectedemploye:string ;    
  selectedemploye2:string ;
  from:string ; 
  to:string  ;   
  selectedclient:string ; 
  totalaffectation:number = 0 ;  
  profession:string = "" ; 
  totalprojects:number = 0; 
  public selected = -1 ; 
  employes:Employe[] = [];  
  clients:Client[] = [] ; 
  public timesheetsreportdata:number[] = [0,0,0];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août','Septembre','Octobre','Novembre' ,'Décembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0,0,0,0,0,0] , label: "Nombre d'heures Approuvées" , 
    } , 
    { data:  [0,0,0,0,0,0,0,0,0,0,0,0] , label: "Nombre d'heures Rejetées" , 
    }
  ]; 

  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(45, 148, 216)' } , 
    { backgroundColor: 'rgb(255, 102, 102)' }
 
  ]; 
  public polarAreaChartLabels: Label[] = ['En cours', 'Terminés', 'Terminés en retard', 'Annulés'];
  public polarAreaChartData: SingleDataSet = [0,0,0,0];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(private userservice:UserService ,  
              private projectservice:ProjectService , 
              private timesheetservice:TimesheetService , 
              private authservice:AuthService , 
              private clientservice:ClientService
              ) { 

   }
   
     ngOnInit(): void { 
        this.getEmployes();
        this.getTimesheetReport();           
        this.setProjectReport();   
        this.getClients();
      } 

      getClients(){ 
        this.clientservice.getClients().subscribe((resp:any)=>{ 
               this.clients = resp ; 
          },(err)=>{console.log(err)})
      }
      
      getTimesheetReport(){ 
        this.timesheetservice.getTimesheetReport(this.selectedemploye2,this.from,this.to) 
            .subscribe((resp:any)=>{ 
              this.prepareandload2(resp); 
        } , 
        
          (err)=>{ 
          console.log(err);
        }       
        )   
      }   

      search3(){         
          this.setProjectReport()
      }
     
      setProjectReport(){ 
        this.projectservice.getProjectsReport(this.selectedclient).subscribe((resp:any)=>{ 
            this.prepareandload1(resp);
        }, (err)=>{ 
           console.log(err)
        })
      }
      
      prepareandload2(resp:any[][]){  
        console.log(resp)
        let array = [0,0,0];
         resp.map((p)=>{

            let label =  p[1] ; 
            let value =  p[0] ;
            
            switch(label){ 
              case "SUBMITTED" :
                array[2] = value ;    
                 break ;  
              case "REJECTED"  :
                 array[1] = value ; 
                 break ; 
              case "APPROUVED" : 
                array[0] = value ;  
                break ; 
            }
           }) 
        this.timesheetsreportdata = array ;    
      
      }

      prepareandload1(resp:any[][]){ 
        
        let array = [0,0,0,0];
        resp.map((f) =>{ 
            let label = f[1];
            let value = f[0]; 

            switch(label) { 
                
               case "en_cours" : 
                  array[0] = value ; 
                  break ; 
               case "termine" : 
                  array[1] = value ; 
                  break ; 
               case "termine_en_retard" :  
                  array[2] = value ; 
                  break ; 
               case "annule" : 
                   array[3] = value ;  
                   break ; 
               default :
                 console.log(label); 
                 break; 
            }
        })

        this.polarAreaChartData = array ;    
       
      }
     

    search(){
        this.getTotalProjects(); 
        this.getTotalAffectation();  
        console.log("selected employe")
        
        this.profession = this.getEmploye().profession; 
        this.retrieveChartdata()
    }   


    search2(){  
      let obj = { employe : this.selectedemploye2 , from : this.from , to : this.to}
      this.getTimesheetReport() 
    }
    
    getTotalProjects(){ 
      this.projectservice.getTotalProjectByEmploye(this.selectedemploye)
                     .subscribe((resp:any)=>{ 
                               this.totalprojects = resp.TOTAL ; 
                     },(err)=>{console.log(err)})
    } 

    getTotalAffectation(){  
      this.projectservice.getTotalAffectationByEmploye(this.selectedemploye) 
                    .subscribe((resp:any)=>{  
                           this.totalaffectation = resp.TOTAL ; 
                    },(err)=> { console.log(err)})
    }

     getEmployes(){ 
       this.userservice.getAllEmployes()
                 .subscribe((resp:any)=>{ 
                      this.processdata(resp); 
                      this.employes = resp ;   
                 } , 
                 (err) => { 
                    console.log(err);
                 }
                 )
   }  

   processdata(resp:any){  
     resp.map((e)=> {  
         let fullName:string  = e.nom[0].toUpperCase()+(e.nom.substring(1,e.nom.length)).toLowerCase()+" "+e.prenom[0].toUpperCase()+(e.prenom.substring(1,e.prenom.length)).toLowerCase() ; 
         e.fullName = fullName ; 
     })
    
   }  


   getEmploye():Employe{   

     let index = this.employes.findIndex((v) => v.id == this.selectedemploye);
     return this.employes[index];
   } 



   retrieveChartdata(){  
         
     this.timesheetservice.getReportByEmployeAndYear(this.selectedemploye,'2021') 
     .subscribe((resp:any)=>{ 
    
       this.setData(resp);
     },(err)=>{ 
        console.log(err);
     })
   
   }
   
   setData(data:any[]){  
   let initdata1 =  [0,0,0,0,0,0,0,0,0,0,0,0] ;  
   let initdata2 =  [0,0,0,0,0,0,0,0,0,0,0,0] ; 
    data.map((v)=>{   
         let isRejected = v[2]; 
         let number = v[0] ;  
         var arr:any =v[1].split(':');
         let result = parseInt(arr[0]) + "." + parseInt(arr[1]); 
         let duration = parseFloat(result);  
        if(isRejected == 0){            //approuved
          initdata1[number-1] = duration ; 
           
        }else if (isRejected == 1){      //rejected
          initdata2[number-1] = duration ; 
         
        } 
       
    }) 
    
    this.barChartData[0].data  = initdata1 ; 
    this.barChartData[1].data  = initdata2 ; 
 
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
   

   changeChartType(){ 
     
    this.barChartType = this.barChartType === 'line' ? 'bar' : 'line' ; 
     
   }

   getSum1(){  
    let sum = 0 ; 
         let newarray:any[]= this.barChartData[0].data.slice(0,12)
         for(let i = 0 ; i < newarray.length ; i++){ 
            sum = sum + newarray[i];
         } 
         return sum.toFixed(2);
   }   

   getSum2(){  
    let sum = 0 ; 
         let newarray:any[]= this.barChartData[1].data.slice(0,12)
         for(let i = 0 ; i < newarray.length ; i++){ 
            sum = sum + newarray[i];
         } 
         return sum.toFixed(2);
   }  







}
