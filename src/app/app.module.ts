import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';  
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service'; 
import { MatCardModule } from '@angular/material/card' ;  
import {  MatButtonModule } from '@angular/material/button' ;  
import {  MatInputModule } from '@angular/material/input' ;  
import { ReactiveFormsModule  } from '@angular/forms' ;  
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { notification } from 'src/services/notification.service'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog" ;   
import { MatCheckboxModule} from '@angular/material/checkbox' ; 
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';   
import { MatSelectModule } from "@angular/material/select";  
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component'; 
import { RecaptchaModule } from "ng-recaptcha";
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { MatToolbarModule } from '@angular/material/toolbar' ;  
import { MatIconModule } from '@angular/material/icon' ; 
import { MatSidenavModule } from '@angular/material/sidenav' ; 
import { MatListModule } from '@angular/material/list' ; 
import { ResetpasswordpageComponent } from './resetpasswordpage/resetpasswordpage.component';
import { AuthGuard } from './auth.guard';
import { UsersmanagementComponent } from './usersmanagement/usersmanagement.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FlexLayoutModule } from '@angular/flex-layout';  
import { MatTabsModule } from '@angular/material/tabs';
import { AdminsComponent } from './tables/admins/admins.component';
import { ManagersComponent } from './tables/managers/managers.component';
import { EmployesComponent } from './tables/employes/employes.component' ;  
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddAdminaDialogComponent } from './usersmanagement/add-admina-dialog/add-admina-dialog.component';
import { AddEmployeDialogComponent } from './usersmanagement/add-employe-dialog/add-employe-dialog.component';
import { AddManagerDialogComponent } from './usersmanagement/add-manager-dialog/add-manager-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { TokenInterceptor } from './tokenInterceptor';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AdminprofileComponent } from './profiles/adminprofile/adminprofile.component';
import { EmployeprofileComponent } from './profiles/employeprofile/employeprofile.component';
import { ManagerprofileComponent } from './profiles/managerprofile/managerprofile.component';
import { ClientsmanagementComponent } from './clientsmanagement/clientsmanagement.component';
import { ClientsComponent } from './tables/clients/clients.component';  
import { ClientService } from '../services/client.service';
import { AddclientComponent } from './clientsmanagement/addclient/addclient.component';
import { EditclientComponent } from './clientsmanagement/editclient/editclient.component';
import { EditEmployeComponent } from './usersmanagement/edit-employe/edit-employe.component';
import { EditManagerComponent } from './usersmanagement/edit-manager/edit-manager.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { ProjetsComponent } from './tables/projets/projets.component';
import { ProjetsArchivComponent } from './tables/projets-archiv/projets-archiv.component';
import { AddProjectComponent } from './projectmanagement/add-project/add-project.component';
import { UpdateProjectComponent } from './projectmanagement/update-project/update-project.component';
import { NgxDropzoneModule } from 'ngx-dropzone';  
import { ProjectService } from 'src/services/project.service';
import { AdddocumentComponent } from './projectdetails/adddocument/adddocument.component';
import { AddphaseComponent } from './projectdetails/addphase/addphase.component';
import { UpdatephaseComponent } from './projectdetails/updatephase/updatephase.component';
import { AddemployetoprojectComponent } from './projectdetails/addemployetoproject/addemployetoproject.component';
import { PhasesComponent } from './tables/phases/phases.component';
import { EquipeComponent } from './tables/equipe/equipe.component';
import { DocumentsComponent } from './tables/documents/documents.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { AffectationsComponent } from './tables/affectations/affectations.component';
import { AddAffecComponent } from './projectdetails/add-affec/add-affec.component';
import { UpdateAffecComponent } from './projectdetails/update-affec/update-affec.component';
import { ProfilesviewComponent } from './views/profilesview/profilesview.component';
import { ProjectsComponent } from './views/employe/projects/projects.component';
import { MatExpansionModule } from '@angular/material/expansion' ;  
import {MatBadgeModule} from '@angular/material/badge';
import { EmployeService } from 'src/services/employe.service';
import { TimesheetviewComponent } from './views/timesheetview/timesheetview.component';
import { AddphasetimesheetComponent } from './views/timesheetview/addphasetimesheet/addphasetimesheet.component';
import { UpdatephasetimesheetComponent } from './views/timesheetview/updatephasetimesheet/updatephasetimesheet.component';
import { TimesheetService } from 'src/services/timesheet.service'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TimesheetmanagementComponent } from './views/manager/timesheetmanagement/timesheetmanagement.component';
import { ClientprojectphaseviewComponent } from './views/clientprojectphaseview/clientprojectphaseview.component';
import  { CommonModule } from '@angular/common';
import { DynamicOutletDirective } from './views/dynamic-outlet.directive';
import { TimesheetprintviewComponent } from './views/timesheetview/timesheetprintview/timesheetprintview.component';
import { TimesheetdetailsComponent } from './views/manager/timesheetdetails/timesheetdetails.component'
import { NgSelectModule } from '@ng-select/ng-select'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RaisonrefusComponent } from './views/manager/timesheetdetails/raisonrefus/raisonrefus.component';
import { RejectiondetailsviewComponent } from './views/rejectiondetailsview/rejectiondetailsview.component';
import { ProjectpiechartComponent } from './projectdetails/projectpiechart/projectpiechart.component';
import { ChartsModule } from 'ng2-charts';
import { SubmittedtimesheetsComponent } from './views/timesheetview/submittedtimesheets/submittedtimesheets.component';
import { YearreportComponent } from './views/employe/yearreport/yearreport.component';
import { EmployesreportComponent } from './views/employesreport/employesreport.component';
import { ClientprojectsviewComponent } from './clientsmanagement/clientprojectsview/clientprojectsview.component';
import { TasksdescriptionComponent } from './projectdetails/tasksdescription/tasksdescription.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { ClientsearchPipe } from './pipes/clientsearch.pipe';
import { EmployesearchfilterPipe } from './pipes/employesearchfilter.pipe';
import { ManagersearchfilterPipe } from './pipes/managersearchfilter.pipe';
import { ProjectsearchfilterPipe } from './pipes/projectsearchfilter.pipe';
import { PhasesearchfilterPipe } from './pipes/phasesearchfilter.pipe';
import { TeamsearchfilterPipe } from './pipes/teamsearchfilter.pipe';
import { AffectationsearchfilterPipe } from './pipes/affectationsearchfilter.pipe';
import { DocumentsearchfilterPipe } from './pipes/documentsearchfilter.pipe';
import { EmployeprojectdurationdetailsComponent } from './projectdetails/employeprojectdurationdetails/employeprojectdurationdetails.component';
import { ProjectcosumeddetailsComponent } from './projectdetails/projectcosumeddetails/projectcosumeddetails.component';
import { AffecterEmployeComponent } from './projectdetails/affecter-employe/affecter-employe.component';
import { ConfirmationOutComponentTimesheettGuard } from './confirmation-out-component-timesheett.guard';
import { AlertsavechangesComponent } from './alertsavechanges/alertsavechanges.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoadingspinnerComponent } from './loadingspinner/loadingspinner.component';
import { TimesheetComponent } from './views/manager/timesheet/timesheet.component';




const routes:Routes = [ 
  {path : "login" , component :LoginComponent} ,  
  {path : "dashboard" , component : DashboardComponent , canActivate : [AuthGuard] ,  
    children  : [  
      {path : 'admin',                   //path admin , manager , employe should be removed
           children : [    
            {path: '', redirectTo: 'users', pathMatch: 'full'},
            {path: 'users', component : UsersmanagementComponent },
            {path: 'reporting', component : EmployesreportComponent } ,  //Reporting Componenet
            {path: 'clients' , component : ClientsmanagementComponent  } 
          ]},  
      {path : 'manager' , 
           children : [  
            {path: '', redirectTo: 'projets', pathMatch: 'full'}, 
            {path : 'reporting' , component : EmployesreportComponent},
            {path: 'projets', component: ProjectmanagementComponent ,  data: { animation: 'isRight' } },  
            {path: 'timesheets' , component : TimesheetdetailsComponent , data: { animation: 'isRight' }} , //timesheetmanagement
            {path : 'projets/:projectid' , component : ProjectdetailsComponent ,  data: { animation: 'isRight' }}, 
            
          ]}, 
      {path : 'employe' , 
           children : [  
             {path : '' , redirectTo : 'timesheet' , pathMatch : 'full'}, 
             {path : 'timesheet' , component : TimesheetviewComponent , canDeactivate : [ConfirmationOutComponentTimesheettGuard]} ,
             {path:  'projects' , component : ProjectsComponent}, 
             {path : 'reporting' , component : YearreportComponent},
             {path:  'projects/:projectid/affectation', component : AffectationsComponent}
           
          ]}
    ]} ,
  {path : "resetpassword/:token" , component : ResetpasswordpageComponent} , 
  {path : "**" , redirectTo : "dashboard" , pathMatch : "full"} 
 
] 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetpasswordComponent,
    DashboardComponent,
    UsersmanagementComponent,
    ReportingComponent,
    ForbiddenComponent, 
    ResetpasswordpageComponent, 
    AdminsComponent, 
    ManagersComponent,
    EmployesComponent , 
    AddAdminaDialogComponent , 
    AddEmployeDialogComponent , 
    AddManagerDialogComponent,  
    FooterComponent,  
    ConfirmModalComponent,  
    AdminprofileComponent, 
    EmployeprofileComponent, 
    ManagerprofileComponent,  
    ClientsmanagementComponent,  
    ClientsComponent,  
    AddclientComponent, 
    EditclientComponent, 
    EditEmployeComponent, 
    EditManagerComponent, 
    ProjectmanagementComponent,  
    ProjectdetailsComponent , 
    ProjetsComponent,  
    ProjectsComponent,
    ProjetsArchivComponent, 
    AddProjectComponent, 
    UpdateProjectComponent, 
    AdddocumentComponent, 
    AddphaseComponent, 
    UpdatephaseComponent, 
    AddemployetoprojectComponent, 
    PhasesComponent, 
    EquipeComponent, 
    DocumentsComponent, 
    AffectationsComponent, 
    AddAffecComponent, 
    UpdateAffecComponent, 
    ProfilesviewComponent,
    TimesheetviewComponent,
    AddphasetimesheetComponent,
    UpdatephasetimesheetComponent,
    TimesheetmanagementComponent,
    ClientprojectphaseviewComponent,
    DynamicOutletDirective,
    TimesheetprintviewComponent,
    TimesheetdetailsComponent,
    RaisonrefusComponent,
    RejectiondetailsviewComponent,
    ProjectpiechartComponent, 
    SubmittedtimesheetsComponent,YearreportComponent, EmployesreportComponent, ClientprojectsviewComponent, TasksdescriptionComponent, SearchfilterPipe, ClientsearchPipe, EmployesearchfilterPipe, ManagersearchfilterPipe, ProjectsearchfilterPipe, PhasesearchfilterPipe, TeamsearchfilterPipe, AffectationsearchfilterPipe, DocumentsearchfilterPipe, EmployeprojectdurationdetailsComponent, ProjectcosumeddetailsComponent, AffecterEmployeComponent, AlertsavechangesComponent, LoadingspinnerComponent, TimesheetComponent

  ],
  imports: [ 

    BrowserModule ,
    AppRoutingModule ,
    FormsModule ,  
    HttpClientModule,
    RouterModule.forRoot(routes) , 
    MatCardModule ,  
    MatButtonModule , 
    MatInputModule ,  
    ReactiveFormsModule , 
    MatSnackBarModule , 
    BrowserAnimationsModule , 
    MatDialogModule , 
    MatFormFieldModule , 
    MatSelectModule , 
    RecaptchaModule ,  
    MatToolbarModule ,
    MatIconModule    ,
    MatSidenavModule , 
    MatListModule , 
    MatCardModule ,
    FlexLayoutModule , 
    MatTabsModule ,     
    NgbModule , 
    NgxDropzoneModule ,  
    MatChipsModule , 
    MatAutocompleteModule ,
    MatExpansionModule  , 
    MatProgressSpinnerModule , 
    CommonModule, 
    NgSelectModule , 
    MatProgressBarModule ,  
    ChartsModule ,  
    MatCheckboxModule ,  
    MatRadioModule , 
    MatTooltipModule , 
    MatBadgeModule
    
   
    
 

  ], 
  schemas : [ CUSTOM_ELEMENTS_SCHEMA], 
  providers: [ 
    AuthService ,
    notification ,  
    ClientService , 
    ProjectService ,  
    EmployeService, 
    TimesheetService,
    { provide: HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi: true }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global{
  interface Navigator{
     msSaveBlob:(blob: Blob,fileName:string) => boolean
  }
} 
