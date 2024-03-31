import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth';
import { ApiResponseUsers } from 'src/app/models/common/api-response-users';
import { ApiResponseEtablissement } from 'src/app/models/common/api-response.model';
import { Etablissement } from 'src/app/models/common/etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private readonly apiUrl = 'http://localhost:8086';
  private readonly api = 'http://localhost:8081';

  constructor(private httpClient:HttpClient) 
  
  { }
       etablissementById$ = (nom:string | null):Observable<ApiResponseEtablissement<Etablissement>>  =>
       this.httpClient.get<any>(this.apiUrl+"/school-api/etablissement/"+nom);
     
      
       getAllVilles$ = (): Observable<any> =>
       this.httpClient.get<any>(`${this.apiUrl}/school-api/ville/all`);
       
       getAllFilieres$ = (): Observable<any> =>
       this.httpClient.get<any>(`${this.apiUrl}/school-api/filiere/all`);

       getAllEtablissements$ = (): Observable<ApiResponseUsers<User[]>> =>
       this.httpClient.get<ApiResponseUsers<User[]>>(`${this.apiUrl}/school-api/etablissement/all`);

       getAllDepartement$ = ():Observable<any> => 
       this.httpClient.get<any>(`${this.apiUrl}/school-api/departement/all`);


       getAllAnnees$ = (): Observable<ApiResponseUsers<User[]>> =>
       this.httpClient.get<ApiResponseUsers<User[]>>(`${this.apiUrl}/school-api/annee/all`);
       
       getFiliereNames$ = (nomDepartement:string): Observable<any> =>
       this.httpClient.get<any>(`${this.apiUrl}/school-api/filiere-name/${nomDepartement}`);

       getEnrolementByUser$ = (userName:string): Observable<any> =>
       this.httpClient.get<any>(`${this.api}/school-enrolement/enrolements/${userName}`);

       getEtudiantsByFilter$ = (nomEtablissement:string,
                                nomFiliere:string,
                                libelleNiveauEtude:string,
                                libelleAnnee:string
                                ): Observable<any> =>
       this.httpClient.get<any>(`${this.api}/school-enrolement/etudiants/${nomEtablissement}/${nomFiliere}/${libelleNiveauEtude}/${libelleAnnee}`);

      
     


   
    }
    