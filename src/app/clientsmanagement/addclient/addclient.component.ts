import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent implements OnInit { 

  public fb:FormGroup ; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ;  


  constructor( 
    private formBuilder: FormBuilder , 
    private clientservice:ClientService , 
    public dialogref:MatDialogRef<AddclientComponent>
  ) {  
        this.fb = this.formBuilder.group({
        nom_client: ['', [Validators.required]], 
        email : [''] , 
        pays : [''] , 
        phone_num : [''] , 

      });

  }

  ngOnInit(): void {

  } 


  onAddClient(){  

    this.submitted = true;    

    if (this.fb.invalid ) {
      return;  
    }
    this.isLoading = true ;   
    this.dialogref.disableClose = true ;      

    this.clientservice.addClient(this.fb.value) 
        .subscribe((result:any)=>{ 
                 this.isLoading = false ; 
                 this.dialogref.close({data:result})
         }, (err) => 
          {  this.isLoading = false ;  
             alert("Internal Server error") }
        )

  }
  
  get f() {  
    return this.fb.controls ;  
  }   

  Annuler(){ 

  }


}
