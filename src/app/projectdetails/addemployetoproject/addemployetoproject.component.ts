import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
//import { AnySoaRecord } from 'node:dns'; 
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Employe } from 'src/Models/Employe';
import { UserService } from 'src/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notification } from 'src/services/notification.service';
import { Project } from 'src/Models/Project';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-addemployetoproject',
  templateUrl: './addemployetoproject.component.html',
  styleUrls: ['./addemployetoproject.component.scss']
})
export class AddemployetoprojectComponent implements OnInit {
  
 /* public allEmployes: any[] = [
    { fullName: 'Talhi Mohammed', employeeId: 1 ,nom : "talhi" , prenom : "mohammed"  },
    { fullName: 'Hakimi Mohammed', employeeId: 3 , nom : "hakimi", prenom : "mohammed"  },
  ];  */

  public allEmployes: any[] = []; 
  public project:Project ;  //anakhud equipe men project après anmodifiha meli nwrk ela ajouter u anrj3ha l parent compoenent" 
  public equipe:any = [] ;  
  public isLoading:boolean = false ; 
  public chipSelectedEmployes:Employe[] = [];
  public filteredEmployes!: Observable<String[]>;
  public isdisabled:boolean = true ; 
  //
  // Set this to false to ensure engineers are from allEngineers list only.
  // Set this to true to also allow 'free text' engineers.
  //
  private allowFreeTextAddEmploye = false;

  public employeControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('engineerInput') employeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete; 


  constructor(private userservice:UserService , 
    public dialogref:MatDialogRef<AddemployetoprojectComponent> , 
    public notification:notification ,  
    public projectservice:ProjectService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { 
      this.project = data.project ;  
  }

  ngOnInit() { 

    // 
    this.userservice.getAllEmployes().subscribe 
     ((resp:any)=>{  
            console.log(this.project.equipe)
            let selectedemps =  this.getselectedemployees(this.project.equipe,resp)
            this.setFullNametoEmployes(selectedemps);   
            this.allEmployes = selectedemps
            
     },(err)=>{ console.log(err)}) 

    this.filteredEmployes = this.employeControl.valueChanges.pipe(
      startWith(null),
      map(engineerName => this.filterOnValueChange(engineerName))
    );
  }
  
  public addEmploye(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddEmploye) {
      // only allowed to select from the filtered autocomplete list
      console.log('allowFreeTextAddEmploye is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    // 

    if (this.matAutocomplete.isOpen) {
      return;
    } 

     // Add our engineer
     const value = event.value;
     if ((value || '').trim()) {
      this.selectEmployeByName(value.trim());
    }

    this.resetInputs();
  }

  public removeEmploye(engineer:any): void {
    const index = this.chipSelectedEmployes.indexOf(engineer);
    if (index >= 0) {  
      this.chipSelectedEmployes.splice(index, 1);  
      this.resetInputs();
      if(this.chipSelectedEmployes.length == 0){ this.isdisabled = true}
    }
  } 

  submit(){  
     this.isLoading = true ; 
     this.projectservice.addEmployesToTeam(this.project.id,this.chipSelectedEmployes) 
           .subscribe((resp:any)=>{ 
             if(resp.STATUS == 200){ 
              this.notification.shownotification("les employés ont bien été ajoutés au projet","Annuler","SUCCESS")
              this.dialogref.close({data:resp.RESPONSE})
             } 
             this.isLoading = false ; 
           },(err) =>{ console.log(err); this.isLoading = false})
  }

  public employeeSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectEmployeByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.employeInput.nativeElement.value = '';
    // clear control value and trigger engineerControl.valueChanges event 
    this.employeControl.setValue(null); 
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filterOnValueChange(employeeName: string | null): String[] {
    let result: String[] = [];
    //
    // Remove the engineers we have already selected from all engineers to
    // get a starting point for the autocomplete list.
    //
    let allEmployesLessSelected = this.allEmployes.filter(engineer => this.chipSelectedEmployes.indexOf(engineer) < 0);
    if (employeeName) {
      result = this.filterEmploye(allEmployesLessSelected,employeeName);
    } else {
      result = allEmployesLessSelected.map(engineer => engineer.fullName);
    }
    return result;
  }

  private filterEmploye(employeeList:any[], employeeName: String): String[] {
    let filteredEmployeeList:any[] = [];
    const filterValue = employeeName.toLowerCase();
    let employeessMatchingEngineerName = employeeList.filter(employee => employee.fullName.toLowerCase().indexOf(filterValue) === 0);
    if (employeessMatchingEngineerName.length || this.allowFreeTextAddEmploye) {
      //
      // either the engineer name matched some autocomplete options 
      // or the name didn't match but we're allowing 
      // non-autocomplete engineer names to be entered
      //
      filteredEmployeeList = employeessMatchingEngineerName;
    } else {
      //
      // the engineer name didn't match the autocomplete list 
      // and we're only allowing engineers to be selected from the list
      // so we show the whjole list
      // 
      filteredEmployeeList = employeeList;
    }
    //
    // Convert filtered list of engineer objects to list of engineer 
    // name strings and return it
    //
    return filteredEmployeeList.map(engineer => engineer.fullName);
  }

  private selectEmployeByName(engineerName:any) {
    let foundEmploye = this.allEmployes.filter(engineer => engineer.fullName == engineerName);
    if (foundEmploye.length) {
      //
      // We found the employe name in the allEngineers list
      //
      this.isdisabled = false ; 
      this.chipSelectedEmployes.push(foundEmploye[0]);
    } else {
      //
      // Create a new engineer, assigning a new higher employeeId
      // This is the use case when allowFreeTextAddEngineer is true
      //
      //let highestEmployeeId = Math.max(...this.chipSelectedEmployes.map(engineer => engineer.employeeId), 0);
      //this.chipSelectedEmployes.push({ fullName: engineerName, employeeId: highestEmployeeId + 1 });
    }
  }
  
  setFullNametoEmployes(employes:Employe[]){ 
      employes.map((emp:Employe) =>{ emp.fullName = emp.nom+" "+emp.prenom })
  }  

 //on élimne les employès qui sont déjà dans l'équipe 
  getselectedemployees(equipe:Employe[],allEmployes:Employe[]){   
  
   // return allEmployes.filter(employe =>equipe.indexOf(employe) < 0 )       

   let employes:Employe[] = []; 
        allEmployes.map((emp:Employe) => { 
               if(!this.isEmployeExist(equipe,emp)){ 
                     employes.push(emp);
               }
        }) 

    return employes ;     
    
  }  

  Annuler(){ 
    this.dialogref.close()
  } 

  isEmployeExist(employelist:Employe[],employe:Employe):boolean{  
     let n:boolean = false; 
     employelist.map((ele:Employe)=>{ 
                if(ele.id === employe.id ){ 
                  n = true ;  
                }        
     }) 
     return n ; 
  }

}
