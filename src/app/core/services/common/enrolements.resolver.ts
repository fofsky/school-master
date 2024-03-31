import { InscriptionEntityService } from './../../../features/inscription/inscription-entity.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable, first, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { SettingService } from '../setting/setting.service';
import { AuthsService } from '../auth/auths.service';


@Injectable({
    providedIn:'root'
})

export class EnrolementsResolver implements Resolve<any> {



    constructor (private inscriptionEntityService:InscriptionEntityService,
        private store:Store<AppState>,
        private settingService:SettingService,
        private auth:AuthsService) {


}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | Observable<any> {
          const mail = this.auth.getUserFromLocalStorage()?.mail;
        return this.settingService.getEnrolementByUser$(mail!);
    }

   
    
}