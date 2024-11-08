// admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalGrievances = 0;
  pendingGrievances = 0;
  resolvedGrievances = 0;

  constructor(
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    this.fetchTotalGrievances();
    this.fetchPendingGrievances();
    this.fetchResolvedGrievances();
  }

  // Fetch the total number of grievances
  fetchTotalGrievances(): void {
    this.complaintService.getTotalComplaints().subscribe({
      next: (count) => this.totalGrievances = count,
      error: (error) => console.error('Error fetching total grievances count:', error)
    });
  }

  // Fetch the number of pending grievances
  fetchPendingGrievances(): void {
    this.complaintService.getPendingComplaints().subscribe({
      next: (count) => this.pendingGrievances = count,
      error: (error) => console.error('Error fetching pending grievances count:', error)
    });
  }

  // Fetch the number of resolved grievances
  fetchResolvedGrievances(): void {
    this.complaintService.getResolvedComplaints().subscribe({
      next: (count) => this.resolvedGrievances = count,
      error: (error) => console.error('Error fetching resolved grievances count:', error)
    });
  }

  // Redirect to login page
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
