import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: Booking;
  error?: string;
}

export interface BookingsResponse {
  success: boolean;
  count: number;
  data: Booking[];
}

export interface AvailabilityResponse {
  success: boolean;
  date: string;
  availableTimes: string[];
  bookedTimes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<BookingResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<BookingResponse>(this.apiUrl, booking, { headers });
  }

  getBookings(params?: {
    date?: string;
    status?: string;
    email?: string;
  }): Observable<BookingsResponse> {
    let queryString = '';
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.date) queryParams.append('date', params.date);
      if (params.status) queryParams.append('status', params.status);
      if (params.email) queryParams.append('email', params.email);
      queryString = '?' + queryParams.toString();
    }

    return this.http.get<BookingsResponse>(`${this.apiUrl}${queryString}`);
  }

  getBookingById(id: string): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.apiUrl}/${id}`);
  }

  updateBookingStatus(id: string, status: string): Observable<BookingResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<BookingResponse>(
      `${this.apiUrl}/${id}`,
      { status },
      { headers }
    );
  }

  cancelBooking(id: string): Observable<BookingResponse> {
    return this.http.delete<BookingResponse>(`${this.apiUrl}/${id}`);
  }

  checkAvailability(date: string): Observable<AvailabilityResponse> {
    return this.http.get<AvailabilityResponse>(`${this.apiUrl}/availability/${date}`);
  }
}

