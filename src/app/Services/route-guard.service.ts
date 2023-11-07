import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
     const expectedRoleArray = route.data['expectedRole'];
      const token: any = localStorage.getItem('accessToken');
      var tokenPayload: any;
      try {
        tokenPayload = jwtDecode(token);
      } catch (err) {
        this.handleAuthenticationError();
        return false;
      }
      if(this.isAuthorized(tokenPayload,expectedRoleArray)){
        return true;
      }else{
        this.handleAuthorizationError();
        return false;
      }
    }

    //permet de vérifier si l'utilisateur a le role attendu
    private isAuthorized(tokenPlayload:any, expectedRoleArray:string[]):boolean{
      return expectedRoleArray.includes(tokenPlayload.role);
    }
    //si l'utilisateur n'est pas authentifier
    private handleAuthenticationError(){
      localStorage.clear();
      this.router.navigate(['/accueil']);
    }
    //si litulisateur n'est pas authoriser
    private handleAuthorizationError(){
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/espacePersonnel'])
    }
}
