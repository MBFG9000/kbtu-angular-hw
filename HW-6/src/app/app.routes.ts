import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ToursComponent } from './tours/tours.component';
import { TourAboutComponent } from './tour-about/tour-about.component';
import { SneakersComponent } from './sneakers/sneakers.component';

export const routes: Routes = [
    { path: 'home', component: MainComponent },
    { path: 'about', component: AboutComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'sneakers', component: SneakersComponent},
    { path: 'tours', component: ToursComponent },
    { path: 'tours/:id', component: TourAboutComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}  
];
