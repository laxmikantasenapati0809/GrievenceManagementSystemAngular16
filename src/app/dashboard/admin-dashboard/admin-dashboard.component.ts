import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service';

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalGrievances = 0;
  pendingGrievances = 0;
  resolvedGrievances = 0;
  complaints: Complaint[] = [];
  showGrievances = false;

  constructor(
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    this.fetchTotalGrievances();
    this.fetchPendingGrievances();
    this.fetchResolvedGrievances();
    this.fetchAllComplaints();  // Pre-fetch all complaints data
  }

  fetchTotalGrievances(): void {
    this.complaintService.getTotalComplaints().subscribe({
      next: (count) => (this.totalGrievances = count),
      error: (error) => console.error('Error fetching total grievances count:', error)
    });
  }

  fetchPendingGrievances(): void {
    this.complaintService.getPendingComplaints().subscribe({
      next: (count) => (this.pendingGrievances = count),
      error: (error) => console.error('Error fetching pending grievances count:', error)
    });
  }

  fetchResolvedGrievances(): void {
    this.complaintService.getResolvedComplaints().subscribe({
      next: (count) => (this.resolvedGrievances = count),
      error: (error) => console.error('Error fetching resolved grievances count:', error)
    });
  }

  fetchAllComplaints(): void {
    this.complaintService.getAllComplaints().subscribe({
      next: (data) => this.complaints = data,
      error: (error) => console.error('Error fetching complaints:', error)
  });
  }

  viewGrievances(): void {
    this.showGrievances = true;
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
