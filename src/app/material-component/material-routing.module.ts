import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ManagerBinderComponent } from './manager-binder/manager-binder.component';
import { RouteGuardService } from '../Services/route-guard.service';
import { ManagerSubjectComponent } from './manager-subject/manager-subject.component';
import { ManagerSubSubjectComponent } from './manager-sub-subject/manager-sub-subject.component';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerTaskComponent } from './manager-task/manager-task.component';
import { ManagerDoctorComponent } from './manager-doctor/manager-doctor.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ManagerRoleComponent } from '../dashboard/manager-role/manager-role.component';
import { ManagerNatureActionComponent } from '../dashboard/manager-nature-action/manager-nature-action.component';

export const MaterialsRouting: Routes= [
  {
    path: 'binder',
    component: ManagerBinderComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedAuthorities: ['USER','ADMIN']
    }
},
{
  path: 'subject',
  component: ManagerSubjectComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedAuthorities: ['USER','ADMIN']
  }
},
{
path: 'subSubject',
component: ManagerSubSubjectComponent,
canActivate: [RouteGuardService],
data: {
  expectedAuthorities: ['USER','ADMIN']
}
},
{
path: 'event',
component: ManagerEventComponent,
canActivate: [RouteGuardService],
data: {
  expectedAuthorities: ['USER','ADMIN']
}
},
{
  path: 'editEvent',
component: EditEventComponent,
canActivate: [RouteGuardService],
data: {
  expectedAuthorities: ['USER','ADMIN']
}
},
{
path: 'task',
component: ManagerTaskComponent,
canActivate: [RouteGuardService],
data: {
  expectedAuthorities: ['USER','ADMIN']
}
},
{
  path: 'doctor',
  component: ManagerDoctorComponent,
  canActivate: [RouteGuardService],
  data: {
    expectedAuthorities: ['USER','ADMIN']
  }
  },
  {
    path: 'role',
    component: ManagerRoleComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedAuthorities: ['ADMIN']
    }
    },
    {
      path: 'natureAction',
      component: ManagerNatureActionComponent,
      canActivate: [RouteGuardService],
      data: {
        expectedAuthorities: ['ADMIN']
      }
      }
  
]



