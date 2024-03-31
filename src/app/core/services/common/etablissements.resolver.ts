import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, first, tap } from 'rxjs';
import { EtablissementDataService } from 'src/app/features/etablissement/etablissement-data.service';
import { EtablissementEntityService } from 'src/app/features/etablissement/etablissement-entity.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Injectable({
  providedIn: 'root'
})


export class EtablissementsResolver implements Resolve<boolean> {

  constructor(private etablissementEntityService:EtablissementEntityService,
              private store:Store<AppState>) {
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.etablissementEntityService.loaded$.pipe(
      tap((loaded) =>{
        if(!loaded)
       {
        this.etablissementEntityService.getAll();
        this.store.dispatch(setLoadingSpinner({status:true}));
       } 
      }),
      first()
    );
  }
}
