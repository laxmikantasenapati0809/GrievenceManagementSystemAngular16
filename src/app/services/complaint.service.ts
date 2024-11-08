// Updated Angular Service (ComplaintService)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:9090/api/complaints';

  constructor(private http: HttpClient) {}

  // Fetch complaints specific to a user
  getComplaintsByUser(userId: number): Observable<Complaint[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Complaint[]>(url);
  }

  // Create a new complaint with userId as a query parameter
  createComplaint(complaint: Complaint, userId: number): Observable<Complaint> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<Complaint>(this.apiUrl, complaint, { headers, params });
  }
}
