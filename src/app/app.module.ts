import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';

// Angular Material Modules (optional)
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { ManagementDashboardComponent } from './dashboard/management-dashboard/management-dashboard.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ManagementcrudComponent } from './dashboard/managementcrud/managementcrud.component';
import { ManageroperationsComponent } from './dashboard/managementcrud/manageroperations/manageroperations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    ManagementDashboardComponent,
    ManagementcrudComponent,
    ManageroperationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,  // Angular Material Input
    MatButtonModule, // Angular Material Button
    MatToolbarModule, // Angular Material Toolbar
    MatTableModule // Angular Material Table
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
