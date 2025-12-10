import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface ColorItem {
  name: string;
  hex: string;
  emoji: string;
}

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;
  viewAllColors = false;

  colors: ColorItem[] = [
    { name: 'Red', hex: '#ef4444', emoji: '🔴' },
    { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
    { name: 'Green', hex: '#10b981', emoji: '🟢' },
    { name: 'Yellow', hex: '#fbbf24', emoji: '🟡' },
    { name: 'Orange', hex: '#f97316', emoji: '🟠' },
    { name: 'Purple', hex: '#a855f7', emoji: '🟣' },
    { name: 'Pink', hex: '#ec4899', emoji: '🌸' },
    { name: 'Brown', hex: '#92400e', emoji: '🟤' },
    { name: 'Black', hex: '#1f2937', emoji: '⚫' },
    { name: 'White', hex: '#f9fafb', emoji: '⚪' }
  ];

  get currentColor(): ColorItem {
    return this.colors[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.colors.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('colors');

    const meta: MetaConfig = {
      title: 'Learn Colors - Kids Learning App',
      description: 'Explore colors with bright examples and names — a colorful learning experience for kids.',
      keywords: 'colors, learn colors, kids learning, color names',
      image: 'https://yourapp.com/assets/colors-preview.jpg',
      url: 'https://yourapp.com/colors',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Learn Colors - Kids Learning App",
      "description": "Interactive color learning for children.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  previous(): void {
    if (this.canGoPrevious) {
      this.currentIndex--;
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
    }
  }

  sayColor(): void {
    this.speechService.speak(this.currentColor.name);
    this.celebrate();
  }
    speakColor(item: string): void {
    this.speechService.speak(item);
  }

  private celebrate(): void {
    this.scoreService.incrementScore('colors');
    this.score = this.scoreService.getScore('colors');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}
