// meta-tags.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaConfig, WebApplicationSchema } from '../models/app.model';
import { StructuredDataService } from './structured-data.service';



@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  constructor(
    private meta: Meta,
    private title: Title,
    private structuredDataService: StructuredDataService
  ) {}

  updateMetaTags(config: MetaConfig): void {
    // Update title
    if (config.title) {
      this.title.setTitle(config.title);
    }

    // Update meta description
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
    }

    // Update keywords
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph tags for social media
    if (config.title) {
      this.meta.updateTag({ property: 'og:title', content: config.title });
    }
    if (config.description) {
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }
    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (config.title) {
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }
    if (config.description) {
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  removeMetaTags(): void {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
  }

  injectMetaTags(metaTags: MetaConfig, schema: WebApplicationSchema): void {
    this.updateMetaTags(metaTags);
    this.structuredDataService.insertSchema(schema);
  }
}