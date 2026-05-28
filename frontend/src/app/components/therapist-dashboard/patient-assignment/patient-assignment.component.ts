import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TherapistService, TherapistPatientResponse } from '../../../services/therapist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-assignment.component.html',
  styleUrls: ['./patient-assignment.component.scss']
})
export class PatientAssignmentComponent implements OnInit {
  availablePatients: TherapistPatientResponse[] = [];
  filteredPatients: TherapistPatientResponse[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  successMessage: string | null = null;
  assigningId: string | null = null;

  constructor(
    private therapistService: TherapistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAvailablePatients();
  }

  loadAvailablePatients(): void {
    this.loading = true;
    this.error = null;
    this.successMessage = null;
    this.therapistService.getAvailablePatients().subscribe({
      next: (patients) => {
        this.availablePatients = patients;
        this.filterPatients();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load available patients';
        console.error('Error loading patients:', error);
        this.loading = false;
      }
    });
  }

  filterPatients(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = this.availablePatients;
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredPatients = this.availablePatients.filter(p =>
        p.patientName.toLowerCase().includes(search) ||
        p.patientEmail.toLowerCase().includes(search)
      );
    }
  }

  onSearchChange(): void {
    this.filterPatients();
  }

  assignPatient(patientId: string, patientName: string): void {
    if (!confirm(`Assign ${patientName} as your patient?`)) {
      return;
    }

    this.assigningId = patientId;
    this.therapistService.assignPatient(patientId).subscribe({
      next: () => {
        this.successMessage = `Successfully assigned ${patientName}`;
        this.assigningId = null;
        setTimeout(() => {
          this.loadAvailablePatients();
        }, 1000);
      },
      error: (error) => {
        this.error = `Failed to assign ${patientName}`;
        this.assigningId = null;
        console.error('Error assigning patient:', error);
      }
    });
  }

  goBackToDashboard(): void {
    this.router.navigate(['/therapist']);
  }
}
