import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { ManagementDashboardComponent } from './dashboard/management-dashboard/management-dashboard.component';
import { ManagementcrudComponent } from './dashboard/managementcrud/managementcrud.component';
import { ManageroperationsComponent } from './dashboard/managementcrud/manageroperations/manageroperations.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, },
  { path: 'management-dashboard', component: ManagementDashboardComponent },
  { path: 'managementcrud', component: ManagementcrudComponent },
  { path: 'manageroperations', component: ManageroperationsComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
