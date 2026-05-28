import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface MoodLogRequest {
  mood: string;
  notes?: string;
  intensityLevel?: number;
  triggers?: string;
}

export interface MoodLogResponse {
  id: string;
  mood: string;
  notes?: string;
  intensityLevel?: number;
  triggers?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private apiUrl = `${environment.apiUrl}/moods`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  logMood(request: MoodLogRequest): Observable<MoodLogResponse> {
    return this.http.post<MoodLogResponse>(`${this.apiUrl}`, request, {
      headers: this.getHeaders()
    });
  }

  getMoodLogs(): Observable<MoodLogResponse[]> {
    return this.http.get<MoodLogResponse[]>(`${this.apiUrl}`, {
      headers: this.getHeaders()
    });
  }

  getMoodLog(moodLogId: string): Observable<MoodLogResponse> {
    return this.http.get<MoodLogResponse>(`${this.apiUrl}/${moodLogId}`, {
      headers: this.getHeaders()
    });
  }

  getMoodLogsByDateRange(startDate: string): Observable<MoodLogResponse[]> {
    return this.http.get<MoodLogResponse[]>(`${this.apiUrl}/range`, {
      params: { startDate },
      headers: this.getHeaders()
    });
  }

  getMoodLogsByType(mood: string): Observable<MoodLogResponse[]> {
    return this.http.get<MoodLogResponse[]>(`${this.apiUrl}/type/${mood}`, {
      headers: this.getHeaders()
    });
  }

  getMoodLogsByExactRange(startDate: string, endDate: string): Observable<MoodLogResponse[]> {
    return this.http.get<MoodLogResponse[]>(`${this.apiUrl}/range/exact`, {
      params: { startDate, endDate },
      headers: this.getHeaders()
    });
  }

  deleteMoodLog(moodLogId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${moodLogId}`, {
      headers: this.getHeaders()
    });
  }
}
