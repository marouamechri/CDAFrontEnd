import { Routes } from '@angular/router';

import { RouteGuardService } from '../Services/route-guard.service';
import { RoleComponent } from './role/role.component';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {
  path: '',
  component: DashboardComponent,
  canActivate: [RouteGuardService],
        data: {
            expectedRole: ['ADMIN']
        }
},
{
  path: 'role',
  component: RoleComponent,
  canActivate: [RouteGuardService],
        data: {
            expectedRole: ['ADMIN']
        }
}
];