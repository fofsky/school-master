import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrangeMoneyService {
  private apiUrl = 'https://api.orange.com/payment'; // Replace with the actual API URL

  constructor(private http: HttpClient) { }

  initiatePayment(amount: number, phone: string): Observable<any> {
    const payload = {
      amount,
      phone
    };

    return this.http.post(`${this.apiUrl}/initiate`, payload);
  }
}
