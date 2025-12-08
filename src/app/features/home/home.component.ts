import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaTagsService) {}

  ngOnInit(): void {
    const meta: MetaConfig = {
      title: 'Kids Learning Hub - Fun Educational Games for Children',
      description: 'Explore ABC, Numbers, Colors and more — interactive learning for kids.',
      keywords: 'kids learning, abc, numbers, colors, educational games',
      image: 'https://yourapp.com/assets/home-preview.jpg',
      url: 'https://yourapp.com/home',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Kids Learning Hub",
      "description": "Interactive educational games and learning resources for children.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}