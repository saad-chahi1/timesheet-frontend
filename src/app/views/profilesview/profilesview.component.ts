import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-profilesview',
  templateUrl: './profilesview.component.html',
  styleUrls: ['./profilesview.component.scss']
})
export class ProfilesviewComponent implements OnInit {
  
  @Input() users:User[] = [] ; 

  constructor() { 
      this.users ; 
  }

  ngOnInit(): void { 

  }

}
