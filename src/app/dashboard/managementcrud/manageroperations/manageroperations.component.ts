import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roleType = params['roleType'] || 'N/A';  // Default to 'N/A' if roleType is not provided
      const complaintsJson = params['complaints'];

      if (complaintsJson) {
        try {
          // Parse the complaints array
          const complaintsData = JSON.parse(complaintsJson);
          console.log('Complaints parsed successfully:', complaintsData); // Log complaints to console
          this.complaints = complaintsData;  // Assign the parsed data to the complaints array
        } catch (error) {
          console.error('Failed to parse complaints JSON:', error); // Log any parsing errors
        }
      } else {
        console.error("Complaints not found in query params");
      }
    });
  }



}
