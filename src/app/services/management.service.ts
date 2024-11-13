// management.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ManagementLoginResponse } from '../models/ManagementLoginResponse';


@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiUrl = 'http://localhost:9090/api/management';

  constructor(private http: HttpClient) { }

  // Method to send management login data to backend
  managementLogin(username: string, password: string, roleType: string): Observable<ManagementLoginResponse> {
    return this.http.post<ManagementLoginResponse>(`${this.apiUrl}/login`, { username, password, roleType });
  }

  // Method to fetch complaints filtered by roleType
  getComplaintsByRoleType(roleType: string): Observable<any[]> {
    const params = new HttpParams().set('roleType', roleType);
    return this.http.get<any[]>(`${this.apiUrl}/complaints`, { params: params });
  }
}
