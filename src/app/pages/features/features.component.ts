import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features = [
    {
      icon: '🌱',
      title: 'Organic & Sustainable',
      description: 'We source only the finest organic coffee beans from certified sustainable farms in Sri Lanka.',
      color: '#4CAF50'
    },
    {
      icon: '🔥',
      title: 'Fresh Roasted Daily',
      description: 'Our beans are roasted fresh every day to ensure maximum flavor and aroma in every cup.',
      color: '#FF6B35'
    },
    {
      icon: '👨‍🍳',
      title: 'Expert Baristas',
      description: 'Our skilled baristas are trained in the art of coffee making, ensuring perfection in every brew.',
      color: '#6F4E37'
    },
    {
      icon: '☕',
      title: 'Wide Variety',
      description: 'From classic espresso to innovative specialty drinks, we have something for every coffee lover.',
      color: '#8B4513'
    },
    {
      icon: '🏆',
      title: 'Award Winning',
      description: 'Recognized for excellence in coffee quality and customer service by industry experts.',
      color: '#FFD700'
    },
    {
      icon: '❤️',
      title: 'Community Focused',
      description: 'We support local farmers and give back to our community through various initiatives.',
      color: '#E91E63'
    }
  ];

  amenities = [
    {
      icon: '📶',
      title: 'Free WiFi',
      description: 'Stay connected while you enjoy your coffee'
    },
    {
      icon: '🪑',
      title: 'Comfortable Seating',
      description: 'Relax in our cozy and spacious environment'
    },
    {
      icon: '🔌',
      title: 'Power Outlets',
      description: 'Work or study with convenient charging stations'
    },
    {
      icon: '🚗',
      title: 'Parking Available',
      description: 'Easy access with dedicated parking spaces'
    }
  ];
}

