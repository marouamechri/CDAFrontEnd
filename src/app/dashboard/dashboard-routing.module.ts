import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';

export const DashboardRoutingModule: Routes= [{
  path: '',
  component: DashboardComponent,

}];

