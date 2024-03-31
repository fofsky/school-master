import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { SpinnerService } from '../common/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8086';


  constructor(private http:HttpClient,
              private spinnerService:SpinnerService  
    ) { }

  // Define function to upload file

  uploadDiplome(userName:string,formData:FormData):Observable<any> {
  return  this.http.put<any>(`${this.apiUrl}/file/upload-diplome/${userName}`,formData).pipe(
    delay(900),
    map((response)=> {
      this.spinnerService.hide();
      return response;
    })
  );
  }

  uploadExtrait(userName:string,formData:FormData):Observable<any> {
    return  this.http.put<any>(`${this.apiUrl}/file/upload-extrait/${userName}`,formData).pipe(
      delay(900),
      map((response)=> {
        this.spinnerService.hide();
        return response;
      })
    );
    }

    uploadPhotoID(userName:string,formData:FormData):Observable<any> {
      return  this.http.put<any>(`${this.apiUrl}/file/upload-photo/${userName}`,formData).pipe(
        delay(500),
        map((response)=> {
          this.spinnerService.hide();
          return response;
        })
      );
      }

  // Define function to download file

  download(filename:string):Observable<HttpEvent<Blob>> {
    return  this.http.get(`${this.apiUrl}/file/download/${filename}`,
   
    {
      reportProgress:true,
      observe: 'events',
      responseType: 'blob'
    });
              
  }


  UpdateImagActeur$ = (userName:string,formdata: FormData): Observable<any> =>
  this.http.put<any>(this.apiUrl+"/school-api/etudiant/image/"+userName, formdata).pipe(
      delay(500),
      map((response)=>{
        this.spinnerService.hide();
        return response;
      })
  );


  
}

