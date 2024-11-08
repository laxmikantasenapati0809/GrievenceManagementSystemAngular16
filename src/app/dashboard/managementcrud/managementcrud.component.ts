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
  errorMessage: string | null = null;  // Add the errorMessage property to the component

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private managementService: ManagementService,
    private snackBar: MatSnackBar
  ) {
    this.managementLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      managementType: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onManagementLogin(): void {
    if (this.managementLoginForm.invalid) {
      return;
    }

    const { username, password, managementType } = this.managementLoginForm.value;

    this.managementService.managementLogin(username, password, managementType).subscribe(
      response => {
        if (response && response.success) {
          this.snackBar.open('Login successful!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

          // Redirect to manager operations page
          setTimeout(() => {
            this.router.navigate(['/manager-operations']);
          }, 500);
        } else {
          this.errorMessage = 'Invalid credentials or management type';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      },
      (error: any) => {  // Explicitly define the type of 'error'
        this.errorMessage = 'An error occurred while logging in';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }

}
