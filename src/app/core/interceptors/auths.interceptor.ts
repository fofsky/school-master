import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, exhaustMap, map, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { AuthsService } from '../services/auth/auths.service';
import { LoadingSpinnerService } from '../services/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getToken } from 'src/app/features/auth/state/auth.selector';
import { USER } from 'src/app/models/auth/user.model';

@Injectable(
)
export class AuthsInterceptor implements HttpInterceptor {


  constructor(
     private authService:AuthsService,
     private router:Router,
     private store:Store<AppState>) {}


  intercept(req: HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
   const user:USER|null = this.authService.getUserFromLocalStorage();
   // this.spinnerService.addQuene();
     if(req.url.includes('/login') ) { 
     
      return next.handle(req).pipe(delay(300),
      map((evt:HttpEvent<any>)=>{
       if(evt instanceof HttpResponse) {
        //this.spinnerService.removeQuene()
      }
       return evt;
      }));;
     }

     if(req.url.includes('/actuator/**') ) { 
     
      return next.handle(req).pipe(delay(300),
      map((evt:HttpEvent<any>)=>{
      //  if(evt instanceof HttpResponse) {
      //   this.spinnerService.removeQuene()
      // }
       return evt;
      }));;
     }
     if(req.url.includes('/school-api/etablissement/all')){
      return next.handle(req);
     }
     if(req.url.includes('/school-api/filiere/all')){
      return next.handle(req);
     }
     if(req.url.includes('/departement/all')) {
      return next.handle(req);
     }
     if(req.url.includes('/school-api/filiere-name'))
     return next.handle(req);

     if(req.url.endsWith('/school-api/etudiant')){
       return next.handle(req);
     }

     if(req.url.endsWith('/school-api/encadreur')){
       return next.handle(req);
      }

      if(req.url.endsWith('/school-api/etudiant/profile')){
        return next.handle(req);
       }
     
    const token = user?.userToken;
    const requestClone = req.clone({headers:req.headers.set('Authorization', `Bearer ${token}`)}) ;               
     return next.handle(requestClone);                                                           
  }


}




