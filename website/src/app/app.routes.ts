import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ToursComponent } from './tours/tours.component';

export const routes: Routes = [
    { path: 'home', component: MainComponent },
    { path: 'about', component: AboutComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'tours', component: ToursComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}  
];
