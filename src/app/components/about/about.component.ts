import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutData = {
    founded: '2020',
    description1: 'Founded in 2020, Brew & Bean has been serving the community with passion, quality, and warmth. We source our beans from sustainable farms around the world and roast them to perfection in-house.',
    description2: 'Our baristas are trained in the art of coffee making, ensuring every cup meets our high standards of excellence. From classic espresso to innovative seasonal drinks, we have something for every coffee lover.'
  };
}