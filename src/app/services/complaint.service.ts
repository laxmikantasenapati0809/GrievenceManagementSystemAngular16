// complaint.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:9090/api/complaints';
  private rolesUrl = '/api/roles'; // URL for roles (define it)

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

  // Update a complaint
  updateComplaint(id: number, complaint: Complaint, userId: number): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.apiUrl}/${id}?userId=${userId}`, complaint);
  }

  // Delete a complaint
  deleteComplaint(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  // Fetch total number of complaints
  getTotalComplaints(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getPendingComplaints(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/pending`);
  }

  // Fetch count of resolved complaints
  getResolvedComplaints(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/resolved`);
  }

  // Fetch all complaints
getAllComplaints(): Observable<Complaint[]> {
  return this.http.get<Complaint[]>(`${this.apiUrl}/all`);
}

// Method to add a management role
addManagementRole(role: { name: string; description: string }): Observable<any> {
  return this.http.post(this.rolesUrl, role); // Use the rolesUrl defined above
}

updateComplaintStatus(complaintId: number, status: string): Observable<any> {
  const url = `${this.apiUrl}/${complaintId}`;
  return this.http.put(url, { status });
}


}
