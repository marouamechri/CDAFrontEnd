import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { RoleComponent } from './role/role.component';
import { DashboardRoutes } from './dashboard-routing';
import { ManagerRoleComponent } from './manager-role/manager-role.component';
import { NatureActionComponent } from './nature-action/nature-action.component';
import { ManagerNatureActionComponent } from './manager-nature-action/manager-nature-action.component';



@NgModule({
  declarations: [
    RoleComponent, 
    ManagerRoleComponent,
    NatureActionComponent,
    ManagerNatureActionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
