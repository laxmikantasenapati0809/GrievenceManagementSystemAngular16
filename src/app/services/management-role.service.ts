import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementRole } from 'src/app/models/ManagementRole.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementRoleService {
  private apiUrl = 'http://localhost:9090/api/management';  // Make sure this matches the backend API URL

  constructor(private http: HttpClient) {}

  addManagementRole(role: ManagementRole): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, role);
  }
}
