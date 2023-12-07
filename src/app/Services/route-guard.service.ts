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
     const expectedAuthorities: Array<string> = route.data['expectedAuthorities'];
      const token: any = localStorage.getItem('accessToken');
      var tokenPayload: any;
      try {
        tokenPayload = jwtDecode(token);
      } catch (err) {
        this.handleAuthenticationError();
        return false;
      }
      //recupérer les authorities de token
      const userAuthorities :any[] =  tokenPayload.authorities;
      const userAuthoritiesArray : any[]=[];
      
      //verifier si l'utilisateur dispose d'au moin une des authorities attendu 
      const hasAuthority = expectedAuthorities.                                                        
      some(expectedAuthority=>userAuthorities.includes(expectedAuthority));

      if(hasAuthority){
        return true;
      }else{
        this.handleAuthorizationError();
        return false;
      }
    }

    //si l'utilisateur n'est pas authentifier
    private handleAuthenticationError(){
      localStorage.clear();
      this.router.navigate(['/accueil']);
    }
    //si l'utilisateur n'est pas authoriser
    private handleAuthorizationError(){
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/espacepersonnel/binder'])
    }
}
