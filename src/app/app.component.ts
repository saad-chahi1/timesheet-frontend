import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { AuthService } from 'src/services/auth.service';
import { fader } from './router-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] , 
 
}) 

export class AppComponent implements OnInit {
  title = 'timesheetfront';   

  constructor(private authservice:AuthService){ 
       
  }

  ngOnInit(){  
 
  } 

  prepareRoute(outlet:RouterOutlet){ 
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
}


} 



