import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: '☕',
      title: 'Premium Coffee',
      description: 'Sourced from the finest Ceylon plantations'
    },
    {
      icon: '🌱',
      title: 'Sustainable',
      description: 'Ethically sourced and environmentally friendly'
    },
    {
      icon: '👨‍🍳',
      title: 'Expert Baristas',
      description: 'Crafted by skilled coffee artisans'
    },
    {
      icon: '🏆',
      title: 'Award Winning',
      description: 'Recognized for excellence in coffee'
    }
  ];
}

