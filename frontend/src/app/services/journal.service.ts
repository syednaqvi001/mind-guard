import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface JournalEntryRequest {
  title: string;
  content: string;
  mood?: string;
  tags?: string;
}

export interface JournalEntryResponse {
  id: string;
  title: string;
  content: string;
  mood?: string;
  sentimentScore?: number;
  distressLevel?: number;
  aiAnalysis?: string;
  isFlagged?: boolean;
  isResolved?: boolean;
  resolvedBy?: string;
  resolutionNotes?: string;
  recommendation?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = `${environment.apiUrl}/journals`;

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

  createEntry(request: JournalEntryRequest): Observable<JournalEntryResponse> {
    return this.http.post<JournalEntryResponse>(`${this.apiUrl}`, request, {
      headers: this.getHeaders()
    });
  }

  getEntries(): Observable<JournalEntryResponse[]> {
    return this.http.get<JournalEntryResponse[]>(`${this.apiUrl}`, {
      headers: this.getHeaders()
    });
  }

  getEntry(entryId: string): Observable<JournalEntryResponse> {
    return this.http.get<JournalEntryResponse>(`${this.apiUrl}/${entryId}`, {
      headers: this.getHeaders()
    });
  }

  getEntriesByDateRange(startDate: string): Observable<JournalEntryResponse[]> {
    return this.http.get<JournalEntryResponse[]>(`${this.apiUrl}/range`, {
      params: { startDate },
      headers: this.getHeaders()
    });
  }

  getFlaggedEntries(): Observable<JournalEntryResponse[]> {
    return this.http.get<JournalEntryResponse[]>(`${this.apiUrl}/flagged`, {
      headers: this.getHeaders()
    });
  }

  updateEntry(entryId: string, request: JournalEntryRequest): Observable<JournalEntryResponse> {
    return this.http.put<JournalEntryResponse>(`${this.apiUrl}/${entryId}`, request, {
      headers: this.getHeaders()
    });
  }

  deleteEntry(entryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${entryId}`, {
      headers: this.getHeaders()
    });
  }
}
