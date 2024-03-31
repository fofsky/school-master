import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SettingService } from './setting.service';
import { ApiResponseEtablissement } from 'src/app/models/common/api-response.model';
import { Etablissement } from 'src/app/models/common/etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class EtablissementResolver implements Resolve<ApiResponseEtablissement<Etablissement>> {
 constructor(private service:SettingService) {

 }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponseEtablissement<Etablissement>> {
  return this.service.etablissementById$(route.paramMap.get('nom'));
  
  }
}
