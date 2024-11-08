import { Component } from '@angular/core';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.css']
})
export class ManagementDashboardComponent {
  managementRoles = [
    { name: 'HR Manager' },
    { name: 'IT Support' },
    { name: 'Finance Lead' },
    { name: 'Operations Head' },
    { name: 'Project Manager' }
  ];
}
