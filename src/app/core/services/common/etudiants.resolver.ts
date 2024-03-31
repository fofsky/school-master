import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, first, map, mergeMap, of, tap } from "rxjs";
import { EtudiantEntityService } from "src/app/features/etudiant/etudiant-entity.service";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";



@Injectable({
    providedIn:'root'
})


export class EtudiantsResolver implements Resolve<boolean> {

  constructor(private etudiantEntityService:EtudiantEntityService,
               private store:Store<AppState>){}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean | Promise<boolean> | Observable<any>
     {
      
        return this.etudiantEntityService.loaded$.pipe(
           tap((loaded) =>
           {
            if(!loaded)
          {this.etudiantEntityService.getAll();
             this.store.dispatch(setLoadingSpinner({status:true}));} 
           }
           ),
           first()
        );
    }

}