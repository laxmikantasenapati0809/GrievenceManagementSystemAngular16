import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service';
import { FeedbackService } from 'src/app/services/feedback.service';  // Assuming a service for feedback
import { Complaint } from 'src/app/models/complaint.model';
import { Feedback } from 'src/app/models/Feedback.model';
import { ManagementRole } from 'src/app/models/ManagementRole.model';
import { ManagementRoleService } from 'src/app/services/management-role.service';

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
  feedbackList: Feedback[] = [];
  showDashboard = true;
  showGrievances = false;
  showManagementForm = false;
  showFeedback = false;

  roleName: string = '';
  roleDescription: string = '';
  rolePassword: string = '';
  roleUsername: string = '';
  selectedRole: string = ''

  //Management Roles
  managementRoles = [
    { name: 'Student Grievance Officer' },
    { name: 'Faculty Grievance Officer' },
    { name: 'Academic Dispute Manager' },
    { name: 'Disciplinary Committee Head' },
    { name: 'Student Welfare Coordinator' },
    { name: 'Faculty Welfare Coordinator' },
    { name: 'Registrar' },
    { name: 'Dean of Students' },
    { name: 'Head of Faculty Affairs' },
    { name: 'Counseling and Support Coordinator' },
    { name: 'Compliance Officer' },
    { name: 'Academic Affairs Director' }
  ];

  constructor(
    private router: Router,
    private complaintService: ComplaintService,
    private feedbackService: FeedbackService,
    private managementRoleService: ManagementRoleService
  ) {}

  ngOnInit(): void {
    this.fetchTotalGrievances();
    this.fetchPendingGrievances();
    this.fetchResolvedGrievances();
    this.fetchAllComplaints();
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
      next: (data) => {
        this.complaints = data;
        this.showGrievances = true;
      },
      error: (error) => {
        console.error('Error fetching complaints:', error);
        alert("Failed to load complaints. Please try again.");
      }
    });
  }

  toggleManagementForm(): void {
    this.showDashboard = false;
    this.showGrievances = false;
    this.showManagementForm = true;
    this.showFeedback = false;
  }

  showFeedbackList(): void {
    this.showDashboard = false;
    this.showGrievances = false;
    this.showManagementForm = false;
    this.showFeedback = true;

    // Fetch feedback from the service
    this.feedbackService.getFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
      },
      error: (error) => {
        console.error('Error fetching feedback:', error);
        alert('Failed to load feedback. Please try again.');
      }
    });
  }

  submitManagementRole(): void {
    if (!this.roleUsername || !this.rolePassword || !this.selectedRole) {
      alert('Please fill in all fields.');
      return;
    }

    const roleData = new ManagementRole(this.roleUsername, this.rolePassword, this.selectedRole);
    console.log('roleData to be sent:', roleData); // Check the data

    this.managementRoleService.addManagementRole(roleData).subscribe({
      next: (response) => {
        alert('Management role added successfully!');
        this.roleUsername = '';
        this.rolePassword = '';
        this.selectedRole = '';
      },
      error: (error) => {
      /**
       * Error handler for adding a management role.
       * @param error The error object with information about the error.
       */
        console.error('Error adding management role:', error);
        alert('Failed to add management role. Please try again.');
      }
    });
  }


  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
