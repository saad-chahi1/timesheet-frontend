import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employe } from 'src/Models/Employe';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-affecter-employe',
  templateUrl: './affecter-employe.component.html',
  styleUrls: ['./affecter-employe.component.scss']
})
export class AffecterEmployeComponent implements OnInit {
  public equipe:Employe[] = [] ;   
  public fb:FormGroup ;  
  public submitted:boolean = false;  
  public phases:any[][] = [] ; 
  public projectid:string = "" ;  
  public state:boolean = false ; 
 
  
  public isLoading:boolean = false ; 
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data:any
    ,private projectservice:ProjectService ,  
    private formBuilder:FormBuilder , 
    public dialogref:MatDialogRef<AffecterEmployeComponent>
    
    ) {  
      this.fb = this.formBuilder.group({
        employe : ['' , Validators.required]  ,
        phases  :  new FormArray([],[Validators.required])
      });   
 
    }   

    updatephases(isChecked,val){ 
       const formArray: FormArray = this.fb.get('phases') as FormArray;

  /* Selected */
  if(isChecked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(val));
  }
  /* unselected */
  else{
    // find the unselected element
    let i: number = 0;

    formArray.controls.forEach((ctrl: FormControl) => {
      if(ctrl.value == val) {
        // Remove the unselected element from the arrayForm
        formArray.removeAt(i);
        return;
      }

      i++;
    });
  }
    }

  ngOnInit(): void {
    //this.projectservice.getNotAffectedPhasesByEmployeAndProject(,)  
            this.equipe = this.data.equipe ;   
            this.projectid = this.data.projectid ; 
            console.log(this.projectid) 
            

      this.onEmployeChange()

      this.fb.get('phases').valueChanges.subscribe((r)=>{ 
              console.log(r)
      }) 


  }    
  get ordersFormArray() {
    return this.fb.controls.phases as FormArray;
   }  

   selectionnertout(val){  
     const formArray: FormArray = this.fb.get('phases') as FormArray;
     if(val == true){     
       this.state = true ;  
       this.clearformarray();
       this.phases.map((v)=>{ 
        formArray.push(new FormControl(v[0]));
       })
      
     }else{  
       this.state = false ; 
       let i: number = 0 ;
       formArray.controls.forEach((ctrl: FormControl) => {
       formArray.removeAt(i);
       i++;
      });
        console.log(formArray);
         
     }
   }
 
   clearformarray(){ 
    const formArray: FormArray = this.fb.get('phases') as FormArray; 
    let i: number = 0 ;
    formArray.controls.forEach((ctrl: FormControl) => {
      formArray.removeAt(i);
      i++;
    });
   }
 
  addephase(){ 
        this.phases.forEach((v)=>{ })
  }

  onEmployeChange(){  
          this.fb.get('employe').valueChanges.subscribe(val =>{  
                
                //clearing selectedphases 
              
                this.projectservice.getNotAffectedPhasesByEmployeAndProject(this.projectid,val) 
                 .subscribe((resp:any)=>{  
                   this.clearPhases();
                   this.phases = resp ; 
                 },(err)=>{console.log(err)}) 

                 
          })
  } 


  clearPhases(){
    const formArray: FormArray = this.fb.get('phases') as FormArray ;  
    let i = 0 ; 
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  onAddSubmit(){ 
    this.submitted = true  ; 
    
    if(this.fb.invalid){ 
      return;
    }   
    this.isLoading = true ;
    this.projectservice.sendAffectations(this.fb.value,this.projectid)  
      .subscribe((resp)=>{  
         this.isLoading = false ; 
         this.dialogref.close({data : resp}) 
      },(err)=>{  
         this.isLoading = false ; 
        console.log(err) 
      })

  } 

  getNotAffectedPhases(projectid:string , employeid:string){ 

  }

  get f() {   
    return this.fb.controls ;  
  }   


  Annuler(){ 
    this.dialogref.close();
  } 

 

  

}
