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
    if (this.managementLoginForm.invalid) {
      return;
    }

    const { username, password, roleType } = this.managementLoginForm.value; // Change managementType to roleType

    // Log the values before making the request
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role Type:", roleType);  // Log roleType to ensure it's not undefined

    this.managementService.managementLogin(username, password, roleType).subscribe(
      response => {
        if (response && response.success) {
          this.snackBar.open('Login successful!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

          setTimeout(() => {
            this.router.navigate(['/manager-operations']);
          }, 500);
        } else {
          this.errorMessage = 'Invalid credentials or management type';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occurred while logging in';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }





}
