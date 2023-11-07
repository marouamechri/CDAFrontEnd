import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ManagerBinderComponent } from './manager-binder/manager-binder.component';
import { RouteGuardService } from '../Services/route-guard.service';
import { ManagerSubjectComponent } from './manager-subject/manager-subject.component';
import { ManagerSubSubjectComponent } from './manager-sub-subject/manager-sub-subject.component';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerTaskComponent } from './manager-task/manager-task.component';

export const MaterialsRouting: Routes= [
  {
    path: 'binder',
    component: ManagerBinderComponent,
    canActivate: [RouteGuardService],
    data: {
        expectedRole: ['USER', 'ADMIN']
    }
},
{
  path: 'subject',
  component: ManagerSubjectComponent,
  canActivate: [RouteGuardService],
  data: {
      expectedRole: ['USER', 'ADMIN']
  }
},
{
path: 'subSubject',
component: ManagerSubSubjectComponent,
canActivate: [RouteGuardService],
data: {
    expectedRole: ['USER', 'ADMIN']
}
},
{
path: 'event',
component: ManagerEventComponent,
canActivate: [RouteGuardService],
data: {
    expectedRole: ['USER', 'ADMIN']
}
},
{
path: 'task',
component: ManagerTaskComponent,
canActivate: [RouteGuardService],
data: {
    expectedRole: ['USER', 'ADMIN']
}
},
]



