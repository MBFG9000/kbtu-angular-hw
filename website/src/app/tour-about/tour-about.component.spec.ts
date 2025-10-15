import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from '../data.service';
import { tour } from '../shared/models/tours';

import { TourAboutComponent } from './tour-about.component';

describe('TourAboutComponent', () => {
  let component: TourAboutComponent;
  let fixture: ComponentFixture<TourAboutComponent>;
  const mockTour: tour = {
    id: 1,
    title: 'Sample tour',
    description: 'Sample description',
    location: 'Sample location',
    duration: '3 days',
    price: 100,
    highlights: ['Highlight one'],
    photo: '/sample.jpg',
    photoGallery: ['/sample.jpg']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourAboutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        },
        {
          provide: DataService,
          useValue: {
            getTourById: () => of(mockTour)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
