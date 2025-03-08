import { NgxSpinnerConfig } from './../../node_modules/ngx-spinner/lib/config.d';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import this!
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorInterceptor,loadingInterceptor])),
     provideAnimations(),
     provideToastr({
      positionClass :'toast-bottom-right',
      closeButton: true
     }),
    ]
};
