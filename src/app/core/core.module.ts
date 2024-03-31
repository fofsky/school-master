import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COOKIE SERVICE
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// SNACKBAR MODULE FOR NOTIFICATIONS
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
// LOADING SPINNER
import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

// HTTP INTERCEPTOR
import { httpInterceptorProviders } from './interceptors';
import { LoadingSpinner } from '../shared/components';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    OverlayModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [CookieService,httpInterceptorProviders],
})
export class CoreModule {}
