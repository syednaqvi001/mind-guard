import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface TherapistPatientResponse {
  id: string;
  therapistId: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  notes?: string;
  isActive: boolean;
  assignedAt: string;
  lastInteractionAt?: string;
  activeAlertsCount: number;
}

export interface PatientMoodLog {
  id: string;
  mood: string;
  intensityLevel?: number;
  triggers?: string;
  createdAt: string;
}

export interface PatientAlert {
  id: string;
  patientId: string;
  journalEntryId: string;
  alertType: string;
  alertMessage: string;
  alertSummary?: string;
  riskScore?: number;
  isAcknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  isResolved: boolean;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TherapistService {
  private apiUrl = 'http://localhost:8081/api/therapists';

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

  getPatients(page?: number, size?: number): Observable<TherapistPatientResponse[]> {
    const params: any = {};
    if (page !== undefined) params['page'] = page;
    if (size !== undefined) params['size'] = size;
    return this.http.get<TherapistPatientResponse[]>(`${this.apiUrl}/patients`, { 
      params,
      headers: this.getHeaders()
    });
  }

  getPatientEntries(patientId: string, limit?: number, offset?: number): Observable<any[]> {
    const params: any = {};
    if (limit) params['limit'] = limit;
    if (offset) params['offset'] = offset;
    return this.http.get<any[]>(`${this.apiUrl}/patients/${patientId}/entries`, { 
      params,
      headers: this.getHeaders()
    });
  }

  getPatientMoods(patientId: string, startDate?: string, endDate?: string): Observable<PatientMoodLog[]> {
    const params: any = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get<PatientMoodLog[]>(`${this.apiUrl}/patients/${patientId}/moods`, { 
      params,
      headers: this.getHeaders()
    });
  }

  getPatientAlerts(patientId: string): Observable<PatientAlert[]> {
    return this.http.get<PatientAlert[]>(`${this.apiUrl}/alerts`, {
      params: { patientId },
      headers: this.getHeaders()
    });
  }

  getTherapistAlerts(status?: string, patientId?: string): Observable<PatientAlert[]> {
    const params: any = {};
    if (status) params['status'] = status;
    if (patientId) params['patientId'] = patientId;
    return this.http.get<PatientAlert[]>(`${this.apiUrl}/alerts`, { 
      params,
      headers: this.getHeaders()
    });
  }

  getAlert(alertId: string): Observable<PatientAlert> {
    return this.http.get<PatientAlert>(`${this.apiUrl}/alerts/${alertId}`, {
      headers: this.getHeaders()
    });
  }

  assignPatient(patientId: string, notes?: string): Observable<TherapistPatientResponse> {
    const body = { notes: notes || '' };
    return this.http.post<TherapistPatientResponse>(`${this.apiUrl}/patients/${patientId}/assign`, body, {
      headers: this.getHeaders()
    });
  }

  unassignPatient(patientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${patientId}/unassign`, {
      headers: this.getHeaders()
    });
  }

  resolveAlert(alertId: string, resolutionNotes?: string, recommendation?: string): Observable<PatientAlert> {
    const body = {
      resolutionNotes: resolutionNotes || '',
      recommendation: recommendation || ''
    };
    return this.http.put<PatientAlert>(`${this.apiUrl}/alerts/${alertId}/resolve`, body, {
      headers: this.getHeaders()
    });
  }

  getPatientCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/patient-count`, {
      headers: this.getHeaders()
    });
  }

  getAvailablePatients(): Observable<TherapistPatientResponse[]> {
    return this.http.get<TherapistPatientResponse[]>(`${this.apiUrl}/available-patients`, {
      headers: this.getHeaders()
    });
  }
}
