// canonical.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string): void {
    const canURL = url || this.dom.URL;
    let link: HTMLLinkElement | null = this.dom.querySelector("link[rel='canonical']");
    
    if (link) {
      link.setAttribute('href', canURL);
    } else {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canURL);
      this.dom.head.appendChild(link);
    }
  }
}