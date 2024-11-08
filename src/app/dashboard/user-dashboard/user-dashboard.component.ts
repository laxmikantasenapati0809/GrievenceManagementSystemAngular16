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
  newComplaint: Complaint = {
    id: 0,
    description: '',
    managementType: '',
    status: 'Pending',
    phoneNumber: '',
    userId: 0
  };

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
      this.snackBar.open('User not logged in. Please log in.', '', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/login']);
    }
  }

  loadComplaints(userId: number): void {
    this.complaintService.getComplaintsByUser(userId).subscribe({
      next: (data) => {
        this.complaints = data;
      },
      error: () => {
        this.snackBar.open('Error fetching complaints', '', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  submitComplaint(): void {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      if (this.newComplaint.description && this.newComplaint.managementType) {
        this.newComplaint.userId = userId;  // Assign userId to newComplaint

        // Pass both the complaint and userId to createComplaint
        this.complaintService.createComplaint(this.newComplaint, userId).subscribe({
          next: () => {
            this.snackBar.open('Complaint Submitted Successfully!', '', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
            this.loadComplaints(userId);
            this.newComplaint = { id: 0, description: '', managementType: '', status: 'Pending', phoneNumber: '', userId: 0 };
          },
          error: (error) => {
            console.error("Error submitting complaint:", error);
            this.snackBar.open('Error submitting complaint', '', {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
          }
        });
      } else {
        this.snackBar.open('Please fill in all fields.', '', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
