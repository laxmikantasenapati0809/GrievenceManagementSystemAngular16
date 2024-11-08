import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Complaint } from 'src/app/models/complaint.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  view: string = 'myComplaints';
  complaints: Complaint[] = [];
  newComplaint: Complaint = this.initializeComplaint();
  editComplaint: Complaint | null = null;

  roles = [
    { name: 'Student Grievance Officer', description: 'Handles student-related grievances' },
    { name: 'Faculty Grievance Officer', description: 'Handles faculty-related grievances' },
    { name: 'Academic Dispute Manager', description: 'Handles academic-related grievances' },
    { name: 'Disciplinary Committee Head', description: 'Handles disciplinary issues' },
    { name: 'Student Welfare Coordinator', description: 'Handles student welfare-related complaints' },
    { name: 'Faculty Welfare Coordinator', description: 'Handles faculty welfare complaints' },
    { name: 'Registrar', description: 'Handles administration-related complaints' },
    { name: 'Dean of Students', description: 'Oversees student-related issues' },
    { name: 'Head of Faculty Affairs', description: 'Handles faculty-specific concerns' },
    { name: 'Counseling and Support Coordinator', description: 'Provides counseling services' },
    { name: 'Compliance Officer', description: 'Ensures legal and institutional protocol compliance' },
    { name: 'Academic Affairs Director', description: 'Handles academic-related complaints' }
  ];

  constructor(
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.loadComplaints(userId);
    } else {
      this.showSnackBar('User not logged in. Please log in.', 'error-snackbar');
      this.router.navigate(['/login']);
    }
  }

  // Initialize a blank complaint
  initializeComplaint(): Complaint {
    return { id: 0, description: '', managementType: '', departmentType: '', status: 'Pending', phoneNumber: '', userId: 0 };
  }

  // Load complaints for the logged-in user
  loadComplaints(userId: number): void {
    this.complaintService.getComplaintsByUser(userId).subscribe({
      next: (data) => this.complaints = data,
      error: () => this.showSnackBar('Error fetching complaints', 'error-snackbar')
    });
  }

  // Submit a new complaint
  submitComplaint(): void {
    const userId = this.authService.getLoggedInUserId();
    if (!userId || !this.newComplaint.description || !this.newComplaint.managementType || !this.newComplaint.departmentType) {
      this.showSnackBar('Please fill in all fields.', 'error-snackbar');
      return;
    }
    this.newComplaint.userId = userId;

    this.complaintService.createComplaint(this.newComplaint, userId).subscribe({
      next: () => {
        this.showSnackBar('Complaint Submitted Successfully!', 'success-snackbar');
        this.loadComplaints(userId);
        this.resetNewComplaintForm();
      },
      error: (error) => {
        console.error("Error submitting complaint:", error);
        this.showSnackBar('Error submitting complaint', 'error-snackbar');
      }
    });
  }

  // Reset new complaint form after submission
  resetNewComplaintForm(): void {
    this.newComplaint = this.initializeComplaint();
  }

  // Set the view to edit complaint and load selected complaint data
  editComplaintDetails(complaint: Complaint): void {
    this.editComplaint = { ...complaint };
    this.view = 'editComplaint';
  }

  // Update the edited complaint
  updateComplaint(): void {
    const userId = this.authService.getLoggedInUserId();
    if (!userId || !this.editComplaint) return;

    this.complaintService.updateComplaint(this.editComplaint.id, this.editComplaint, userId).subscribe({
      next: () => {
        this.showSnackBar('Complaint Updated Successfully!', 'success-snackbar');
        this.loadComplaints(userId);
        this.cancelEdit();
      },
      error: (error) => {
        console.error("Error updating complaint:", error);
        this.showSnackBar('Error updating complaint', 'error-snackbar');
      }
    });
  }

  // Cancel editing and reset view to myComplaints
  cancelEdit(): void {
    this.editComplaint = null;
    this.view = 'myComplaints';
  }

  // Delete a specific complaint
  deleteComplaint(complaintId: number): void {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) return;

    this.complaintService.deleteComplaint(complaintId, userId).subscribe({
      next: () => {
        this.showSnackBar('Complaint Deleted Successfully!', 'success-snackbar');
        this.loadComplaints(userId);
      },
      error: (error) => {
        console.error("Error deleting complaint:", error);
        this.showSnackBar('Error deleting complaint', 'error-snackbar');
      }
    });
  }

  // Show a snack bar message
  showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [panelClass]
    });
  }

  // Logout function
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
