import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 


const routes: Routes = [];

@NgModule({
  imports: [ BrowserModule,CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 

export class AppRoutingModule { }
