import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SystemHealth } from 'src/app/models/dashboard/system-health';
import { SystemCpuCount } from 'src/app/models/dashboard/sytem-cpu-count';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
 private readonly apiUrl =  'http://localhost:8086';

  constructor(private httpClient:HttpClient) { }

  public gettHttpTraces():Observable<any> {
  return  this.httpClient.get<any>(`${this.apiUrl}/actuator/httptrace`);
  }

  public getSystemHealth():Observable<SystemHealth> {
    return this.httpClient.get<SystemHealth>(`${this.apiUrl}/actuator/health`);
  }

  public getSystemCpu():Observable<SystemCpuCount> {
    return this.httpClient.get<SystemCpuCount>(`${this.apiUrl}/actuator/metrics/system.cpu.count`);
  }

  
  public getProcessUptime():Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/actuator/metrics/process.uptime`);
  }
}
