import { Injectable } from '@angular/core';
// SNACKBAR
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar'
import { SNACK_DATA } from 'src/app/models/notification';
// MODELS

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {

  constructor(private snackbar:MatSnackBar) { }
  
  public show(snackData: SNACK_DATA) {
    this.snackbar.open(snackData?.message, snackData?.action || 'OK', {
      duration: snackData?.duration || 4000,
      direction:'rtl',
      horizontalPosition:'left',
      verticalPosition:'top',
      
      
      
     
    });
  }
}
