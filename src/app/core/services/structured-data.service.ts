// structured-data.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  insertSchema(schema: any, className = 'structured-data'): void {
    let script: HTMLScriptElement | null;
    let shouldAppend = false;
    
    script = this.dom.querySelector(`script.${className}`);
    
    if (!script) {
      script = this.dom.createElement('script');
      script.classList.add(className);
      shouldAppend = true;
    }
    
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    
    if (shouldAppend) {
      this.dom.head.appendChild(script);
    }
  }

  removeStructuredData(): void {
    const els = this.dom.querySelectorAll('script.structured-data');
    els.forEach(el => el.remove());
  }
}

// Usage in component
// ngOnInit(): void {
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "WebApplication",
//     "name": "Kids Learning App",
//     "description": "Educational app for children",
//     "applicationCategory": "EducationalApplication",
//     "offers": {
//       "@type": "Offer",
//       "price": "0",
//       "priceCurrency": "USD"
//     }
//   };
  
//   this.structuredDataService.insertSchema(schema);
// }