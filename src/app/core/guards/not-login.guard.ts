import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthsService } from '../services/auth/auths.service';
// SERVICES
@Injectable({
  providedIn: 'root',
})


export class NotLoginGuard implements CanActivate, CanLoad {
  constructor(
             private router: Router,
             private authService:AuthsService) {}
  // CHECK IF NOT LOGGED
  checkAuth() {
     const isLogged :boolean= this.authService.getTokenFromCache()?true:false;


    return isLogged;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuth();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuth();
  }
}
