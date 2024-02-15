import { Component, Inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/Models/Client';
import { ClientService } from 'src/services/client.service';
import { notification } from 'src/services/notification.service'; 

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss']
})
export class EditclientComponent implements OnInit {
  
  public fb:FormGroup ; 
  public submitted:boolean = false ;   
  public isLoading:boolean = false ;  
  public client:Client ; 

  constructor(
    private formBuilder: FormBuilder , 
    private clientservice:ClientService , 
    public notification:notification , 
    public dialogref:MatDialogRef<EditclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
     
    this.fb = this.formBuilder.group({
      nom_client: ['', [Validators.required]], 
      email : [''] , 
      pays : [''] , 
      phone_num : [''] , 
    }); 

    this.client = data.user ;  

  }

  ngOnInit(): void { 

    this.fb.controls['nom_client'].setValue(this.client.nom_client);  
    this.fb.controls['pays'].setValue(this.client.pays); 
    this.fb.controls['phone_num'].setValue(this.client.phone_num);
    this.fb.controls['email'].setValue(this.client.email);  

  }
   
  onUpdateClient(){  

    this.submitted = true;   
    if (this.fb.invalid ) {
      return;  
    }      

    this.isLoading =  true ;   
    this.fb.value.id=this.client.id ;   

    this.clientservice.updateClient(this.client.id,this.fb.value).subscribe((result:any)=>{ 
      console.log(result)
      if(result.status == 200){     
         this.dialogref.close({data:result.response}) ;  
         this.notification.shownotification("Le client a bien été modifé","annuler","SUCESS")
      }
    },(err)=>{  
      this.isLoading = false ; 
       console.log(err);
    })
  
  }
  
  get f() {  
    return this.fb.controls ;  
  }   
  
  Annuler(){ 
    this.dialogref.close();
  }
} 


