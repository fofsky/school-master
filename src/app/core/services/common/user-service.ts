import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Acteur, Etudiant } from "src/app/models/common/acteur.model";





@Injectable({
    providedIn:'root'
})
export class UserService {
    private readonly apiUrl = 'http://localhost:8086';

constructor(private httpClient:HttpClient) {}


    public createUserFormData(etudiant:Etudiant, profileImage:File):FormData{
        const formData = new FormData();

        formData.append('prenom',etudiant.prenom);
        formData.append('nom',etudiant.nom);
        formData.append('userName',etudiant.userName);
        formData.append('matricule',etudiant.matricule);
        formData.append('nomEtablissement',etudiant.nomEtablissement);
        formData.append('telephonePersonnel',etudiant.telephonePersonnel);
        formData.append('dateNaissance',etudiant.dateNaissance);
        formData.append('sexe',etudiant.sexe);
        formData.append('password',etudiant.password);
        formData.append('profileImage',profileImage);

       return formData;

    }
    public udateProfileImage(formData:FormData):Observable<any> {
        return this.httpClient.post<any>(``,formData,{
            reportProgress:true,
            observe:'events'
        });
    }
      userByUserName$ = (userName:string):Observable<any> => 
           this.httpClient.get<any>(`${this.apiUrl}/school-api/acteur/${userName}`);
      

}