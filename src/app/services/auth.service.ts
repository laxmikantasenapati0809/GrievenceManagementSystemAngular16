import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response && response.id) {
          localStorage.setItem('loggedInUser', JSON.stringify({ id: response.id, username: response.username }));
          this.loggedIn.next(true);
        }
      }),
      catchError(() => of(null))
    );
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }

  setUser(username: string, id: number): void {
    localStorage.setItem('loggedInUser', JSON.stringify({ id, username }));
    this.loggedIn.next(true);
  }

  getLoggedInUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    return user.id || null;
  }

  isAuthenticated(): Observable<boolean> {
    this.loggedIn.next(this.hasToken());
    return this.loggedIn.asObservable();
  }

  hasToken(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
