import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ActeurEntityService } from 'src/app/features/acteur/acteur-entity.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Injectable({
  providedIn: 'root'
})
export class MyProfileResolver implements Resolve<boolean> {
  constructor(private acteurEntityService:ActeurEntityService,
              private store:Store<AppState>) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.acteurEntityService.loaded$.pipe(
      tap((loaded) =>{
        if(!loaded)
        {
          this.store.dispatch(setLoadingSpinner({status:true}))
          this.acteurEntityService.getByKey(route.paramMap.get('id'));
        }   
      })
    );
  }
}
