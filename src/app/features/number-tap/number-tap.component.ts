import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';
import { timer } from 'rxjs';

interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

@Component({
  selector: 'app-number-tap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-tap.component.html',
  styleUrls: ['./number-tap.component.css']
})
export class NumberTapComponent {
  maxnumber = Array.from({ length: 10 }, (_, i) => i + 1);
  randomNumber = signal(0);
  findNumberGame = false;

  randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  activeNumber: Number | null = null;

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private metaService: MetaTagsService
  ) {
    const meta: MetaConfig = {
      title: 'Tap & Learn Number - Kids Learning App',
      description: 'Tap numbers to hear them aloud — a playful way to learn counting 1-20.',
      keywords: 'tap number, number tap, counting, kids learning',
      image: 'https://yourapp.com/assets/number-tap-preview.jpg',
      url: 'https://yourapp.com/number-tap',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Tap & Learn Number - Kids Learning App",
      "description": "Tap numbers to hear them aloud and learn counting interactively.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
    this.randomNumber.set(this.randomNumberBetween(1, this.maxnumber.length));
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
  findNumber(item: Number): void {
    if (this.randomNumber() === item) {
      this.speechService.speak(`Your number ${item} is correct `);

      timer(2000).subscribe(() => {
        this.randomNumber.set(this.randomNumberBetween(1, this.maxnumber.length));
        this.speechService.speak(`Find Number ${this.randomNumber()}`);
      });
    } else {
      this.speechService.speak(`Try again`);
    }
  }

  findNumberText(): void {
    this.speechService.speak(`Find Number ${this.randomNumber()}`);
    this.findNumberGame = true;
  }

  onNumberTap(item: Number): void {

    this.activeNumber = item;
    this.speechService.speak(`${item}`);

    // Remove active state after animation
    setTimeout(() => {
      this.activeNumber = null;
    }, 500);
  }

  isActive(letter: number): boolean {
    return this.activeNumber === letter;
  }
}
