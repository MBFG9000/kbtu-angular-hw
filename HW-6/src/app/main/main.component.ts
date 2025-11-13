import { Component } from '@angular/core';
import { LucideAngularModule, Map, Mails, MapPin, Headset, Instagram, MessageCircleMore, Heart } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [LucideAngularModule, RouterLink, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  readonly Map = Map;
  readonly Mails = Mails;
  readonly MapPin = MapPin;
  readonly Headset = Headset;
  readonly Instagram = Instagram;
  readonly MessageCircleMore = MessageCircleMore
  readonly Heart = Heart;

  likes = 0;

  description:string = `
          At Go Travel Kazakhstan, we turn every journey into an unforgettable
            adventure. From the majestic peaks of the Tian Shan mountains to the
            serene beauty of Kolsai Lakes, we help you explore the hidden gems
            and vibrant culture of our incredible country. Let your wanderlust
            guide you — Kazakhstan is waiting to inspire you.
  
  `;
  aboutUsdesc:string = `Have a question or want to plan your trip? Get in touch with our team — we’re here to help!`
  photoUrl: string = 'kolsay-image-2.jpg';
  isToggleDisabled: boolean = false;
  showMessage = false;
  userName: string = '';
  userNameSaved:string = this.userName;
  email: string = '';
  message: string = '';
  subscribed: boolean = false;
  
  get isButtonDisable() {
    return !this.userName || !this.email || !this.message;
  }

  onSubmit() {
    this.subscribed = true;
    // очищаем форму
    this.userNameSaved = this.userName;
    this.userName = '';
    this.email = '';
    this.message = '';
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  addLike() {
  this.likes++;
  }
  

  toggleMessage() {
  this.showMessage = !this.showMessage;
  }
}
