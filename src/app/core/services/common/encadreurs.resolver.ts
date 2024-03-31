import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { EncadreurEntityService } from 'src/app/features/encadreur/encadreur-entity.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Injectable({
  providedIn: 'root'
})
export class EncadreursResolver implements Resolve<boolean> {
  constructor(private encadreurEntityService:EncadreurEntityService,
              private store:Store<AppState>){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.encadreurEntityService.loaded$.pipe(
      tap((loaded)=>{
        if(!loaded) {
           this.store.dispatch(setLoadingSpinner({status:true}));
           this.encadreurEntityService.getAll();
        }
      })
    );
  }
}
