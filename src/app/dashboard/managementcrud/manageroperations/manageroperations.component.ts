import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Complaint {
  id: number;
  description: string;
  status: string;
  managementType: string;
  departmentType: string;
  phoneNumber: string;
  userId: string;
}

@Component({
  selector: 'app-manageroperations',
  templateUrl: './manageroperations.component.html',
  styleUrls: ['./manageroperations.component.css']
})
export class ManageroperationsComponent implements OnInit {
  complaints: Complaint[] = [];
  roleType: string = '';

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roleType = params['roleType'] || 'N/A';
      const complaintsJson = params['complaints'];

      if (complaintsJson) {
        try {
          const complaintsData = JSON.parse(complaintsJson);
          console.log('Complaints parsed successfully:', complaintsData);
          this.complaints = complaintsData;
        } catch (error) {
          console.error('Failed to parse complaints JSON:', error);
        }
      } else {
        console.error("Complaints not found in query params");
      }
    });
  }

  updateComplaintStatus(id: number, status: string) {
    return this.http.put(`http://localhost:9090/api/complaints/${id}/status`, null, {
      params: { status: status }
    });
  }

  // This method is triggered when the "Mark as Resolved" button is clicked
  onMarkResolved(complaintId: number) {
    this.updateComplaintStatus(complaintId, 'Resolved').subscribe(response => {
      console.log('Complaint status updated:', response);
      // Update the local complaints array if needed to reflect the status change
      const complaint = this.complaints.find(c => c.id === complaintId);
      if (complaint) {
        complaint.status = 'Resolved'; // Update the status in the UI
      }
    }, error => {
      console.error('Error updating complaint status:', error);
    });
  }

}
