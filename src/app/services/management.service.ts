import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementLoginResponse } from '../models/ManagementLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiUrl = 'http://localhost:8080/api/auth/management-login';  // Adjust with your Spring Boot endpoint

  constructor(private http: HttpClient) { }

  // Method to send management login data to backend
  managementLogin(username: string, password: string, managementType: string): Observable<ManagementLoginResponse> {
    return this.http.post<ManagementLoginResponse>(this.apiUrl, { username, password, managementType });
  }
}
