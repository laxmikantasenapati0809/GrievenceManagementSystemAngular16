import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback.model'; // Import the Feedback type

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = '/api/feedback';  // Assuming this is the endpoint for feedback

  constructor(private http: HttpClient) {}

  // Method to fetch feedback from the server
  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);  // Specify the feedback type
  }
}
