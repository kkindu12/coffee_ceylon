import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookingForm = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    occasion: '',
    specialRequests: ''
  };

  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  availableTimes: string[] = [];
  selectedDate: string = '';

  occasions = [
    'Casual Visit',
    'Business Meeting',
    'Date',
    'Birthday Celebration',
    'Anniversary',
    'Group Gathering',
    'Other'
  ];

  constructor(private bookingService: BookingService) {
    this.generateAvailableTimes();
  }

  generateAvailableTimes(): void {
    const times: string[] = [];
    for (let hour = 7; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    this.availableTimes = times;
  }

  onDateChange(): void {
    if (this.bookingForm.date) {
      this.selectedDate = this.bookingForm.date;
      this.checkAvailability();
    }
  }

  checkAvailability(): void {
    if (!this.bookingForm.date) return;

    this.bookingService.checkAvailability(this.bookingForm.date).subscribe({
      next: (response) => {
        if (response.success) {
          this.availableTimes = response.availableTimes;
          // If currently selected time is not available, clear it
          if (this.bookingForm.time && !response.availableTimes.includes(this.bookingForm.time)) {
            this.bookingForm.time = '';
            this.errorMessage = 'The selected time is no longer available. Please choose another time.';
            setTimeout(() => this.errorMessage = '', 5000);
          }
        }
      },
      error: (error) => {
        console.error('Error checking availability:', error);
        // Fallback to showing all times if API fails
        this.generateAvailableTimes();
      }
    });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Book up to 3 months in advance
    return maxDate.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.submitted || this.loading) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = true;
    this.loading = true;

    this.bookingService.createBooking(this.bookingForm).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = response.message || 'Thank you for your booking request! We will confirm your reservation via email shortly.';
          // Reset form
          this.bookingForm = {
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: 1,
            occasion: '',
            specialRequests: ''
          };
          this.selectedDate = '';
          this.submitted = false;
          this.generateAvailableTimes();
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.errorMessage = response.message || 'An error occurred. Please try again.';
          this.submitted = false;
        }
      },
      error: (error) => {
        this.loading = false;
        this.submitted = false;
        this.errorMessage = error.error?.message || 'Failed to submit booking. Please check your connection and try again.';
        console.error('Booking error:', error);
      }
    });
  }

  getGuestOptions(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}

