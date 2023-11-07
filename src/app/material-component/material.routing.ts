import { Routes } from '@angular/router';
import { RouteGuardService } from '../Services/route-guard.service';
import { ManagerBinderComponent } from './manager-binder/manager-binder.component';
import { ManagerSubjectComponent } from './manager-subject/manager-subject.component';
import { ManagerSubSubjectComponent } from './manager-sub-subject/manager-sub-subject.component';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerTaskComponent } from './manager-task/manager-task.component';

export const MaterialRoutes: Routes = [
    {
        path: 'binder',
        component: ManagerBinderComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['USER','ADMIN']
        }
    },
    {
        path: 'subject',
        component: ManagerSubjectComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['USER','ADMIN']
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
        path: 'Event',
        component: ManagerEventComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['USER', 'ADMIN']
        }
    },
    {
        path: 'Task',
        component: ManagerTaskComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['USER', 'ADMIN']
        }
    }

];
