import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalService } from '../../../services/journal.service';

@Component({
  selector: 'app-journal-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal-create.component.html',
  styleUrls: ['./journal-create.component.scss']
})
export class JournalCreateComponent {
  title = '';
  content = '';
  mood = 'neutral';
  loading = false;
  error: string | null = null;

  moods = ['happy', 'sad', 'angry', 'anxious', 'calm', 'neutral', 'excited', 'tired'];

  constructor(
    private journalService: JournalService,
    private router: Router
  ) {}

  createEntry(): void {
    if (!this.title.trim() || !this.content.trim()) {
      this.error = 'Title and content are required';
      return;
    }

    this.loading = true;
    this.error = null;

    this.journalService.createEntry({
      title: this.title,
      content: this.content,
      mood: this.mood,
      tags: ''
    }).subscribe({
      next: () => {
        this.router.navigate(['/journal']);
      },
      error: (error) => {
        this.error = 'Failed to create journal entry. Please try again.';
        this.loading = false;
        console.error('Error creating entry:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/journal']);
  }
}
