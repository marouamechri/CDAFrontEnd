import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router:Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    //ferivier si il la presence de token dans localStorage
    const token = localStorage.getItem('accessToken');
    //s'il ya un token on ajoute headers Authorization de tout les requette sortante 
    if(token){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        //gere les erreurs 
        if(err instanceof HttpErrorResponse){
          console.log(err.url);
          if(err.status === 401 || err.status === 403){
            //on est sur la page d'accueil on fait rien 
            if(this.router.url === '/'){}
            else{
              //redirection vers la page d'accueil
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    )
  }
  
}
