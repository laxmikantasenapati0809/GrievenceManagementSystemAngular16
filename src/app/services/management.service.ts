import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementLoginResponse } from '../models/ManagementLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiUrl = 'http://localhost:9090/api/management/login';

  constructor(private http: HttpClient) { }

  // Method to send management login data to backend
  managementLogin(username: string, password: string, roleType: string): Observable<ManagementLoginResponse> {
    return this.http.post<ManagementLoginResponse>(this.apiUrl, { username, password, roleType });
  }

}
