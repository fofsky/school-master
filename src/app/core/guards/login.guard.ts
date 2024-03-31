import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthsService } from '../services/auth/auths.service';
import { NotificationService } from '../services/common/notification.service';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor( private router: Router, 
    private authService:AuthsService,
    private notificationService:NotificationService
    ) {}
  // CHECK IF LOGGED
  get checkAuth() {
    const isLogged = localStorage.getItem('access-token')? true:false; 
    if (!isLogged) {
      return this.router.createUrlTree(['/auth']);
    }
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
      
    return this.isUserLoggedIn();

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isUserLoggedIn();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn():boolean {
    if(this.authService.isLoggedIn())
      {return true;}
      this.router.navigate(['/auth']);
      this.notificationService.showNotification(NotificationType.ERROR,`You need to log in to access this page`.toUpperCase())
      return false;
    
  }
  
}
