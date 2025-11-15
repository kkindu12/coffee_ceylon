import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  categories = [
    {
      name: 'Espresso',
      items: [
        { name: 'Classic Espresso', description: 'Rich and bold, the foundation of great coffee', price: '$3.50' },
        { name: 'Americano', description: 'Espresso with hot water for a smooth, full-bodied cup', price: '$4.00' },
        { name: 'Cappuccino', description: 'Espresso with steamed milk and velvety foam', price: '$4.50' },
        { name: 'Latte', description: 'Smooth espresso with steamed milk and light foam', price: '$4.75' },
        { name: 'Macchiato', description: 'Espresso marked with a dollop of foamed milk', price: '$4.25' }
      ]
    },
    {
      name: 'Specialty Drinks',
      items: [
        { name: 'Ceylon Mocha', description: 'Our signature blend with rich chocolate and Ceylon coffee', price: '$5.50' },
        { name: 'Caramel Latte', description: 'Sweet caramel meets smooth espresso and steamed milk', price: '$5.25' },
        { name: 'Vanilla Bean Latte', description: 'Creamy vanilla with our premium espresso', price: '$5.25' },
        { name: 'Hazelnut Cappuccino', description: 'Nutty hazelnut flavor in a classic cappuccino', price: '$5.00' },
        { name: 'Cinnamon Dolce', description: 'Warm cinnamon spice with espresso and milk', price: '$5.50' }
      ]
    },
    {
      name: 'Cold Beverages',
      items: [
        { name: 'Iced Coffee', description: 'Chilled Ceylon coffee served over ice', price: '$4.00' },
        { name: 'Cold Brew', description: 'Smooth, slow-steeped coffee, less acidic and full of flavor', price: '$4.75' },
        { name: 'Iced Latte', description: 'Espresso with cold milk over ice', price: '$4.75' },
        { name: 'Frappé', description: 'Blended ice coffee with your choice of flavor', price: '$5.50' },
        { name: 'Iced Americano', description: 'Refreshing espresso with cold water over ice', price: '$4.25' }
      ]
    },
    {
      name: 'Tea & More',
      items: [
        { name: 'Ceylon Tea', description: 'Traditional Sri Lankan black tea, served hot or iced', price: '$3.50' },
        { name: 'Green Tea', description: 'Light and refreshing green tea', price: '$3.50' },
        { name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: '$4.50' },
        { name: 'Hot Chocolate', description: 'Rich, creamy hot chocolate', price: '$4.00' },
        { name: 'Matcha Latte', description: 'Premium matcha with steamed milk', price: '$5.00' }
      ]
    },
    {
      name: 'Pastries & Snacks',
      items: [
        { name: 'Croissant', description: 'Buttery, flaky French croissant', price: '$3.50' },
        { name: 'Chocolate Chip Cookie', description: 'Freshly baked with premium chocolate', price: '$2.75' },
        { name: 'Blueberry Muffin', description: 'Moist and flavorful with fresh blueberries', price: '$3.25' },
        { name: 'Bagel with Cream Cheese', description: 'Fresh bagel with your choice of spread', price: '$4.00' },
        { name: 'Quiche', description: 'Savory quiche with seasonal ingredients', price: '$5.50' }
      ]
    }
  ];
}

