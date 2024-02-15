import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Phase } from 'src/Models/Phase';

@Component({
  selector: 'app-clientprojectphaseview',
  templateUrl: './clientprojectphaseview.component.html',
  styleUrls: ['./clientprojectphaseview.component.scss']
})
export class ClientprojectphaseviewComponent implements OnInit { 

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  public phase:string ; 


  constructor() {  }

  ngOnInit(): void {   

       
   // console.log(this.model)
  } 


  getPhase(phase:string){ 
   console.log(this.phase)
  }

}
