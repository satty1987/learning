import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { PwaUpdateService } from './app/core/services/pwa-update.service';

bootstrapApplication(App, appConfig).then(appRef => {
    // Initialize PWA update service
    appRef.injector.get(PwaUpdateService);
  })
  .catch((err) => console.error(err));
