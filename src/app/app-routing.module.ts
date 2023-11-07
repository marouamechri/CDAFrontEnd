import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FullComponent } from './sidebar/full.component';
import { RouteGuardService } from './Services/route-guard.service';

const routes:Routes=[
    {
      path: '',
      redirectTo: '/accueil',
      pathMatch: 'full'
    }
    // ,
    // {
    //   path: 'accueil',
    //   component: HomeComponent,
    //   children: [
    //     {
    //       path: 'connexion', component: LoginComponent, pathMatch: 'full'
    //     },
    //     {
    //       path: 'inscription', component: SignupComponent, pathMatch: 'full'
    //     }
    //   ]
    // }
  //   ,{
  //     path: 'espacepersonnel',
  //     component: FullComponent,
  //     children: [
  //       {
  //         path: '',
  //         loadChildren: () => import('./material-component/full-material.module').then(m => m.FullMaterialModule),
  //         canActivate: [RouteGuardService],
  //         data: {
  //           expectedRole: ['USER', 'ADMIN']
  //         }
  //       },
  //       {
  //         path: 'dashboard',
  //         loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  //         canActivate: [RouteGuardService],
  //         data: {
  //           expectedRole: ['ADMIN']
  //         }
  //       }
  //     ]
  //   },
  //   { path: '**', component: HomeComponent }
  ]
  


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
