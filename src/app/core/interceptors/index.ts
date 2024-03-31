import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthsInterceptor } from './auths.interceptor';
import { ErrorInterceptor } from './ErrorInterceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass:AuthsInterceptor,multi:true}
];
