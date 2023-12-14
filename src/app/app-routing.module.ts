import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './Services/route-guard.service';
import { BasMenusAcceuilComponent } from './bas-menus-acceuil/bas-menus-acceuil.component';

const routes:Routes=[
    {
      path: '',
      redirectTo: '/accueil',
      pathMatch: 'full'
    },
    {
      path: 'accueil',
      component: HomeComponent,
      children: [
        {
          path: 'connexion', component: LoginComponent, pathMatch: 'full'
        },
        {
          path: 'inscription', component: SignupComponent, pathMatch: 'full'
        },{
          path: '', component: BasMenusAcceuilComponent, pathMatch:'full'
        }
      ]
    }
    ,{
      path: 'espacepersonnel',
      component: FullComponent,
      children: [
        {
          path: '', 
          redirectTo: '/espacepersonnel/binder',
          pathMatch: 'full'
        },
        
        {
          path: '',
          loadChildren: () => import('./material-component/full-material.module').then(m => m.FullMaterialModule),
          canActivate: [RouteGuardService],
          data: {
            expectedAuthorities: ['USER','ADMIN']
          }
        },
        {
          path: 'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          canActivate: [RouteGuardService],
          data: {
            expectedAuthorities: ['ADMIN']
          }
        }
      ]
    },
    { path: '**', component: HomeComponent }
  ]
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
