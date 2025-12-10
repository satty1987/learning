import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
      this.listenForUpdates();
    }
  }

  private checkForUpdates(): void {
    // Check for updates when app is stable
    const appIsStable$ = this.appRef.isStable.pipe(
      first(isStable => isStable === true)
    );
    
    // Check every 6 hours
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        if (updateFound) {
          console.log('A new version is available.');
        }
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  private listenForUpdates(): void {
    this.swUpdate.versionUpdates.subscribe(event => {
      switch (event.type) {
        case 'VERSION_DETECTED':
          console.log('Downloading new app version:', event.version.hash);
          break;
        case 'VERSION_READY':
          console.log('New app version ready:', event.latestVersion.hash);
          this.promptUserToUpdate();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.error('Failed to install app version:', event.version.hash);
          break;
      }
    });
  }

  private promptUserToUpdate(): void {
    if (confirm('New version available! Reload to update?')) {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
      });
    }
  }
}