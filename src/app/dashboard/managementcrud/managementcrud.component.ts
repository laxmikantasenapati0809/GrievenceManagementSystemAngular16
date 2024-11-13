import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-managementcrud',
  templateUrl: './managementcrud.component.html',
  styleUrls: ['./managementcrud.component.css']
})
export class ManagementcrudComponent implements OnInit {

  managementLoginForm: FormGroup;
  errorMessage: string | null = null;
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
    private fb: FormBuilder,
    private router: Router,
    private managementService: ManagementService,
    private snackBar: MatSnackBar
  ) {
    this.managementLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleType: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onManagementLogin(): void {
    console.log('Login button clicked');
    if (this.managementLoginForm.invalid) {
      const usernameErrors = this.managementLoginForm.controls['username'].errors;
      const passwordErrors = this.managementLoginForm.controls['password'].errors;
      const roleTypeErrors = this.managementLoginForm.controls['roleType'].errors;

      console.log('Username Errors:', usernameErrors);
      console.log('Password Errors:', passwordErrors);
      console.log('RoleType Errors:', roleTypeErrors);
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
      return;
    }

    const { username, password, roleType } = this.managementLoginForm.value;

    console.log('Login form submitted with:', { username, password, roleType }); // Debug log

    this.managementService.managementLogin(username, password, roleType).subscribe(
      response => {
        console.log('Login response:', response); // Log response from backend

        if (response && response.success) {
          // Extract the complaints data from the response
          const complaints = response.data; // Assuming the complaints are under 'data'

          console.log('Complaints received:', complaints); // Log complaints

          this.snackBar.open('Login successful!', 'Close', { duration: 2000 });

          setTimeout(() => {
            this.router.navigate(['/manageroperations'], {
              queryParams: { roleType: roleType, complaints: JSON.stringify(complaints) }
            });
          }, 500);
        } else {
          this.errorMessage = 'Invalid credentials or management type';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      },
      error => {
        console.error('Login error:', error); // Log error
        this.errorMessage = 'An error occurred while logging in';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }
}
