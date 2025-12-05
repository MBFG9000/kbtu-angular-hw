import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/enviroments';
import { provideStore } from '@ngrx/store';
import { sneakersReducer } from './shared/state/sneakers.reducer';
import { SneakersEffects } from './shared/state/sneakers.effects';
import { provideEffects } from '@ngrx/effects';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStore({
      sneakers: sneakersReducer
    }),
    provideEffects([SneakersEffects]),

    // Redux DevTools, чтобы смотреть actions/state в браузере
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
]
};
