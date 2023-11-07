import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRouting } from './material-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManagerBinderComponent } from './manager-binder/manager-binder.component';
import { ManagerSubjectComponent } from './manager-subject/manager-subject.component';
import { ManagerSubSubjectComponent } from './manager-sub-subject/manager-sub-subject.component';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerTaskComponent } from './manager-task/manager-task.component';
import { MaterialModule } from '../shared/material-module';



@NgModule({
  declarations: [
    ManagerBinderComponent,
    ManagerSubjectComponent,
    ManagerSubSubjectComponent,
    ManagerEventComponent,
    ManagerTaskComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(MaterialsRouting),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ]
})
export class MaterialsModule { }
