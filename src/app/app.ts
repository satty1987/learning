import { Component, Inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CanonicalService } from './core/services/canonical.service';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kidsLearning');

  constructor(
    private router: Router,
    private canonical: CanonicalService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.router.events
      .pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe(() => {
        // Use the <base> tag if present so base-href is respected
        const baseHref = this.doc.querySelector('base')?.href ?? `${location.origin}/`;
        // Build full absolute URL for canonical
        const canonicalUrl = new URL(this.router.url, baseHref).toString();
        this.canonical.setCanonicalURL(canonicalUrl);
      });
  }
}
