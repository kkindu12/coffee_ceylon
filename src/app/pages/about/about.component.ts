import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  story = {
    title: 'Our Story',
    founded: '2015',
    description1: 'Coffee Ceylon was born from a passion for bringing the finest Ceylon coffee to the world. Founded in 2015, we have dedicated ourselves to sourcing the highest quality beans from the lush plantations of Sri Lanka.',
    description2: 'Our journey began with a simple mission: to share the rich heritage and exceptional taste of Ceylon coffee with coffee lovers everywhere. We work directly with local farmers, ensuring fair trade practices and sustainable farming methods.',
    description3: 'Today, Coffee Ceylon stands as a testament to quality, tradition, and innovation. Our expert baristas craft each cup with precision, honoring the centuries-old coffee culture while embracing modern techniques.'
  };

  values = [
    {
      icon: '🌿',
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices and supporting local communities.'
    },
    {
      icon: '⭐',
      title: 'Quality',
      description: 'Every bean is carefully selected and roasted to perfection to ensure the finest cup.'
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Our love for coffee drives everything we do, from sourcing to serving.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We believe in building strong relationships with our customers and partners.'
    }
  ];
}

