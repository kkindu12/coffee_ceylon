import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  submitted = false;

  contactInfo = {
    address: '123 Coffee Street, Colombo, Sri Lanka',
    phone: '+94 11 234 5678',
    email: 'info@coffeeceylon.com',
    hours: {
      weekdays: 'Monday - Friday: 7:00 AM - 8:00 PM',
      weekend: 'Saturday - Sunday: 8:00 AM - 9:00 PM'
    }
  };

  onSubmit(): void {
    this.submitted = true;
    console.log('Form submitted:', this.contactForm);
    // Here you would typically send the form data to a backend service
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm = { name: '', email: '', phone: '', message: '' };
      this.submitted = false;
    }, 100);
  }
}

