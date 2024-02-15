import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/Models/Client';
import { ClientService } from 'src/services/client.service';
import { notification } from 'src/services/notification.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  
  public active:any ; 
  files: File[] = [] ;  
  public clients:Client[] = []
  public fb:FormGroup ;    
  public submitted:boolean = false;
  public isLoading:boolean = false ; 

  constructor(  
    private formBuilder: FormBuilder , 
    public dialogref:MatDialogRef<AddProjectComponent> , 
    public clientservice:ClientService , 
    public projectservice:ProjectService ,  
    public notification:notification
  ) { 
    this.fb = this.formBuilder.group({
      nom: ['', [Validators.required]],  
      client : ['' , [Validators.required]], 
      duree : [''] , 
      description : [''] , 
      dateDebut : [''] ,
      dateFin : [''] , 
      type : ['' , [Validators.required]] , 
      coutestim : ['']
    }); 
  }

  ngOnInit(): void { 
     //adding client list 
     this.clientservice.getClients().subscribe 
     ((resp:any) =>{ 
            this.clients = resp ;   
            this.fb.controls['client'].patchValue(this.clients[0].id)
     }, 
      (err) => { 
            console.log(err);
      }
     )
  }  


  onAddProject(){  
    
    this.submitted = true;     
  
    if (this.fb.invalid ) {
      return;  
    }  
    this.isLoading = true ; 
    let data = Object.assign({},this.fb.value) 
    data['client'] = {id : this.fb.value.client}  
    
    console.log(this.fb.value)

    this.projectservice.addproject(data,this.files) 
          .subscribe((result) =>{ 
                   this.isLoading = false ; 
                   this.notification.shownotification("Le projet a bien été  crée","Annuler","SUCCESS");
                   this.dialogref.close({data:result}); 
                   
            },(err) => {   
              this.notification.shownotification("Internal Server Error","Annuler","ERROR")
                   this.isLoading = false ; 
                   console.log(err);
          }) 
  
  }

  get f() {  
    return this.fb.controls ;  
  }   

  onSelect(event:any) {  
  
    this.files.push(...event.addedFiles);  

    const formData = new FormData();  
  
    for (var i = 0; i < this.files.length; i++) {   
      formData.append("file[]", this.files[i]);  
    }  
  } 
  
  onRemove(event:any) {   
    this.files.splice(this.files.indexOf(event), 1);  
}   

Annuler(){
      this.dialogref.close();
}

}
