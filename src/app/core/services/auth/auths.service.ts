import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import jwtDecode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { autoLogout } from 'src/app/features/auth/state/auth.actions';
import { LOGIN_FORM_DATA, User } from 'src/app/models/auth';
import { AuthResponseData } from 'src/app/models/auth/authResponseDatat.model';
import { USER } from 'src/app/models/auth/user.model';
import { ApiResponseUsers } from 'src/app/models/common/api-response-users';
import { AppState } from 'src/app/store/app.state';
import { NotificationType } from '../../enums/notification-type.enum';




@Injectable({ providedIn: 'root' })
export class AuthsService {
  private readonly apiUrl = 'http://localhost:8086';
  timeOutInterval: any;
  private jwtHelper = new JwtHelperService();
  private token?: string;
  private loggedInUserName!: string;

  notificationService!:NotifierService;

  constructor(private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    ) {}

  login(user: LOGIN_FORM_DATA): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.apiUrl + "/school-api/sec/login", user, { headers: headers });
  }


  // This methode is designed to format user Data from the token to make its use easier

  formatUser(response: any): USER {
    const token = response.data.token['Jwt-Token'][0];
    const authResponseData: AuthResponseData = jwtDecode(token);
    const user = new USER(authResponseData.sub, token, authResponseData.role, jwtDecode<any>(token).Authorities, authResponseData.exp);
    return user;
  }

  setUserInLocalStorage(user: USER) {
    localStorage.setItem('userData', JSON.stringify(user));

    // this.runTimeOutInterval(user);
  }

  getErrorMessage(message: string): any {
    switch (message) {
      case '401':
        return 'Email or Password Incorect';
      case 'Http failure response for http://localhost:8096/login: 401 OK':
        return 'Email or Password Incorect';
      default: return 'Unknown Error Occured. Please try again';

    }
  }

  public sendErrorNotification(notificationType:NotificationType,messsage:string){
      if(messsage){
        this.notificationService.notify(notificationType,messsage);
      }  else {
        this.notificationService.notify(notificationType,'AN ERROR OCCURED, PLEASE TRY AGAIN');
      }
  }


  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new USER(
        userData.email,
        userData.token,
        userData.roles,
        userData.Authorities,
        userData.expirationDate);

      this.runTimeOutInterval(user);

      return user;
    }
    return null;
  }

  runTimeOutInterval(user: USER) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate;
    // const timeInterval = expirationDate - todaysDate;
    // console.log(timeInterval); 
    this.timeOutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, expirationDate);
  }

  logout() {
    localStorage.removeItem('userData');
    // if(this.timeOutInterval) {
    //clearTimeout(this.timeOutInterval);
    //   this.timeOutInterval = null;

    // }
    this.router.navigate(['/auth']);
  }


  addTokenToCache(authResult: any) {
    localStorage.setItem('access-token', authResult);
  }

  getTokenFromCache(): string | null { return localStorage.getItem('access-token'); }



  addPctureToCache(fileName: string) { localStorage.setItem('name-key', fileName); }

  getPictureFromCache() { return localStorage.getItem('name-key'); }

  removePictureFromCache() { localStorage.removeItem('name-key') }

  loadToken() {
    const user = this.getUserFromLocalStorage();
    this.token = user?.userToken;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token)!.sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }

    } else {
      this.logout();
      return false;
    }

    return false;
  }


  addUserToCahe(user: User) { localStorage.setItem('user', JSON.stringify(user)); }

  getUserFromCache() { return JSON.parse(localStorage.getItem('user')!); }

  isLoggedOut() { return !this.isLoggedIn(); }

  errorHandler(httperror: HttpErrorResponse) {
    let msg = '';
    if (httperror.error instanceof ErrorEvent) {
      // client side Errror
      msg = httperror.error.message;
    } else {
      // Server side Error
      msg = `Error code: ${httperror.message} and Status:${httperror.status}`
    }

    return throwError(msg);
  }


  // API endpoints
  getUsers$ = (mc?: string): Observable<ApiResponseUsers<User[]>> =>
    this.http.get<ApiResponseUsers<User[]>>(`${this.apiUrl}/school-api/sec/users?${mc}`);

  saveUser$ = (formDAta: FormData): Observable<ApiResponseUsers<User>> =>
    this.http.post<any>(`${this.apiUrl}/school-api/etudiant/profile`, formDAta);




}







