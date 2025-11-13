import { Component } from '@angular/core';
import { LucideAngularModule, Sparkles, ShoppingBag, ShieldCheck, Star, Truck, Instagram, ArrowUpRight } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [LucideAngularModule, RouterLink, CurrencyPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  readonly Sparkles = Sparkles;
  readonly ShoppingBag = ShoppingBag;
  readonly ShieldCheck = ShieldCheck;
  readonly Star = Star;
  readonly Truck = Truck;
  readonly Instagram = Instagram;
  readonly ArrowUpRight = ArrowUpRight;

  heroMetrics = [
    { label: 'Pairs shipped', value: '120K+' },
    { label: 'Members worldwide', value: '48K' },
    { label: 'New drops monthly', value: '12' }
  ];

  featuredDrops = [
    {
      tag: 'Daily comfort',
      name: 'AeroPulse 2.0',
      price: 189,
      accent: 'Soft foam cloud',
      image: 'https://images.unsplash.com/photo-1529385101576-4e90c1dcd1d5?auto=format&fit=crop&w=900&q=80'
    },
    {
      tag: 'Performance',
      name: 'Velocity Run LX',
      price: 220,
      accent: 'Carbon midsole',
      image: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=900&q=80'
    },
    {
      tag: 'Limited',
      name: 'Skyline Drip 01',
      price: 260,
      accent: 'Reflective knit',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    }
  ];

  perks = [
    {
      title: 'Priority shipping',
      description: 'Fast worldwide delivery on every pair, free over $120.',
      icon: Truck
    },
    {
      title: 'Member rewards',
      description: 'Exclusive access to early drops and private restocks.',
      icon: Star
    },
    {
      title: 'Authenticity first',
      description: 'Every sneaker is hand-checked and comes with a digital tag.',
      icon: ShieldCheck
    }
  ];

  lookbookSpots = [
    {
      title: 'City Night Run',
      description: 'Reflective uppers keep the pace visible after sunset.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Weekend Courts',
      description: 'Retro palettes built for the streetball revival.',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80'
    }
  ];
}
