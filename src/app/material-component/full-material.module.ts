import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material-module';
import { HttpClientModule } from '@angular/common/http';
import{CdkTableModule} from '@angular/cdk/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ManagerBinderComponent } from './manager-binder/manager-binder.component';
import { ManagerSubjectComponent } from './manager-subject/manager-subject.component';
import { ManagerSubSubjectComponent } from './manager-sub-subject/manager-sub-subject.component';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerTaskComponent } from './manager-task/manager-task.component';
import { MaterialsRouting } from './material-routing.module';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { BinderComponent } from './dialog/binder-component/binder-component';
import { SubjectCompenent } from './dialog/subject-compenent/subject-compenent';
import { SubSubjectComponent } from './dialog/sub-subject/sub-subject.component';
import { ManagerDoctorComponent } from './manager-doctor/manager-doctor.component';
import { DoctorComponent } from './dialog/doctor/doctor.component';
import { EventComponent } from './dialog/event/event.component';
import { ConsultationComponent } from './dialog/consultation/consultation.component';
import { TraitementComponent } from './dialog/traitement/traitement.component';
import { AnalyseComponent } from './dialog/analyse/analyse.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { FileUploadComponent } from './dialog/file-upload/file-upload.component';
import { EditEventComponent } from './edit-event/edit-event.component';

@NgModule({
  declarations: [
    ManagerBinderComponent,
    ManagerSubjectComponent,
    ManagerSubSubjectComponent,
    ManagerEventComponent,
    ManagerTaskComponent,
    ConfirmationComponent,
    BinderComponent,
    SubjectCompenent,
    SubSubjectComponent,
    ManagerDoctorComponent,
    DoctorComponent,
    EventComponent, 
    ConsultationComponent,
    TraitementComponent,
    AnalyseComponent,
    FileUploadComponent,
    EditEventComponent
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialsRouting),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [

  ]

})
export class FullMaterialModule { }
