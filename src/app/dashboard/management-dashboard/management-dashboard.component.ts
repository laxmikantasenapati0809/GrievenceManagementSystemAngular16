import { Component } from '@angular/core';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.css']
})
export class ManagementDashboardComponent {
  managementRoles = [
    { name: 'Student Grievance Officer' },  // Handles student-related grievances
    { name: 'Faculty Grievance Officer' },  // Handles faculty-related grievances
    { name: 'Academic Dispute Manager' },  // Handles academic-related grievances, for both faculty and students
    { name: 'Disciplinary Committee Head' },  // Handles disciplinary issues, for both students and faculty
    { name: 'Student Welfare Coordinator' },  // Deals with student welfare-related complaints (mental health, harassment, etc.)
    { name: 'Faculty Welfare Coordinator' },  // Deals with faculty welfare complaints (workload, environment, etc.)
    { name: 'Registrar' },  // Handles formal complaints related to administration or records
    { name: 'Dean of Students' },  // Oversee all student-related issues including grievances
    { name: 'Head of Faculty Affairs' },  // Handles faculty-specific concerns related to their duties or work environment
    { name: 'Counseling and Support Coordinator' },  // Provides counseling services and handles complaints regarding harassment or emotional distress
    { name: 'Compliance Officer' },  // Ensures that complaints follow legal and institutional protocols
    { name: 'Academic Affairs Director' }  // Handles complaints related to academics such as grades, exam issues, etc.
];

getCardStyle(index: number) {
  const colorPalettes = [
    ['#ff7e5f', '#feb47b'],
    ['#ff6a00', '#ee0979'],
    ['#24c6dc', '#514a9d'],
    ['#43cea2', '#185a9d'],
    ['#f7971e', '#ffd200'],
    // Add more color combinations as needed
  ];

  // If there are more roles than colors, loop the color palette
  const palette = colorPalettes[index % colorPalettes.length];
  return {
    'background': `linear-gradient(145deg, ${palette[0]}, ${palette[1]})`
  };
}
}
