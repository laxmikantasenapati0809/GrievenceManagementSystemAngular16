// admin-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.adminLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onAdminLogin() {
    const { username, password } = this.adminLoginForm.value;

    // Hardcoded admin credentials
    if (username === 'admin' && password === '1234') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'Invalid admin credentials';
    }
  }
}
