import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

@Component({
  selector: 'app-abc',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.css']
})
export class AbcComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;

  alphabet: AlphabetItem[] = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Balloon', emoji: '🎈' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fox', emoji: '🦊' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'House', emoji: '🏠' },
    { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
    { letter: 'J', word: 'Juggle', emoji: '🤹' },
    { letter: 'K', word: 'Key', emoji: '🔑' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Moon', emoji: '🌙' },
    { letter: 'N', word: 'Note', emoji: '🎵' },
    { letter: 'O', word: 'Octopus', emoji: '🐙' },
    { letter: 'P', word: 'Penguin', emoji: '🐧' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rainbow', emoji: '🌈' },
    { letter: 'S', word: 'Star', emoji: '⭐' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Violin', emoji: '🎻' },
    { letter: 'W', word: 'Whale', emoji: '🐋' },
    { letter: 'X', word: 'X-ray', emoji: '❌' },
    { letter: 'Y', word: 'Yarn', emoji: '🧶' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
  ];

  get currentItem(): AlphabetItem {
    return this.alphabet[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.alphabet.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService,
  ) { }

  ngOnInit(): void {
    this.score = this.scoreService.getScore('abc');
    const metaTags: MetaConfig = {
      title: 'Learn ABC - Kids Learning App',
      description: 'Interactive alphabet learning for kids. Learn letters A-Z with fun animations and sounds.',
      keywords: 'abc learning, alphabet, kids education, learning app',
      image: 'https://yourapp.com/assets/abc-preview.jpg',
      url: 'https://yourapp.com/abc',
      type: 'website'
    }
    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Kids Learning App",
      "description": "Educational app for children",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    this.metaService.injectMetaTags(metaTags, schema);
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

  sayLetter(): void {
    this.speechService.speak(`${this.currentItem.letter}. ${this.currentItem.word}`);
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('abc');
    this.score = this.scoreService.getScore('abc');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}
