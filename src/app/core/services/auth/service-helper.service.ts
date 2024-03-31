import { Injectable } from '@angular/core';
import { AuthsService } from './auths.service';
import jwt_decode from "jwt-decode";
import { TOKEN } from 'src/app/models/auth';


@Injectable({
  providedIn: 'root'
})
export class ServiceHelperService {

  constructor(private authService:AuthsService,
                ) { }

  decodeToken():any {
    const token = this.authService.getTokenFromCache();
    if(token)
   return jwt_decode(token);
  }


    checkIfAdmin():boolean{
    const cur:TOKEN= this.decodeToken();
    let t:boolean=false;
          for (let i = 0; i < cur.roles.length; i++) {
               if(cur.roles[i]==="ROLE_ADMIN")
               return t=true;
            }

            return t;

  }

  checkIfSuperAdmin():boolean{
    const cur:TOKEN= this.decodeToken();
    let t:boolean=false;
          for (let i = 0; i < cur.roles.length; i++) {
               if(cur.roles[i]==="SUPER ADMIN")
               return t=true;
            }

            return t;

  }


}
