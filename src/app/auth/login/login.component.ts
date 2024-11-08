import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Property to toggle password visibility

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form group with validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Toggle the visibility of the password field
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Navigation method to the register page
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Login submission method
  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      response => {
        if (response && response.username && response.id) {
          this.authService.setUser(response.username, response.id);
          this.snackBar.open('Logged in successfully!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

          setTimeout(() => {
            this.router.navigateByUrl('/user-dashboard');
          }, 500);
        } else {
          this.errorMessage = 'Unexpected response format from server.';
        }
      },
      error => {
        this.errorMessage = error.status === 401
          ? 'Invalid username or password'
          : 'An error occurred. Please try again later.';
      }
    );
  }

  // Navigation methods
  navigateToAdmin() {
    this.router.navigate(['/admin-login']);
  }

  navigateToManagementLogin() {
    this.router.navigate(['/managementcrud']);
  }
}
