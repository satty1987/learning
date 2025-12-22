import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface RhymeOption {
  word: string;
  emoji: string;
  hint: string;
  example: string;
}

interface RhymeCard {
  baseWord: string;
  baseEmoji: string;
  gradient: string;
  options: RhymeOption[];
}

@Component({
  selector: 'app-rhymes',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './rhymes.component.html',
  styleUrls: ['./rhymes.component.css']
})
export class RhymesComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;
  feedback = '';

  cards: RhymeCard[] = [
    {
      baseWord: 'Cat',
      baseEmoji: '🐱',
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7, #f43f5e)',
      options: [
        { word: 'Hat', emoji: '🎩', hint: 'You wear it.', example: 'The cat wore a silly hat.' },
        { word: 'Bat', emoji: '🦇', hint: 'Flies at night.', example: 'A bat flew past the cat.' },
        { word: 'Mat', emoji: '🧼', hint: 'You wipe your feet.', example: 'The cat sat on the mat.' }
      ]
    },
    {
      baseWord: 'Sun',
      baseEmoji: '🌞',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316, #fb923c)',
      options: [
        { word: 'Fun', emoji: '🎉', hint: 'Happy times.', example: 'Playing outside is fun in the sun.' },
        { word: 'Run', emoji: '🏃', hint: 'Move fast.', example: 'We run and chase under the sun.' },
        { word: 'Bun', emoji: '🥯', hint: 'Bread roll.', example: 'A warm bun at a sunny picnic.' }
      ]
    },
    {
      baseWord: 'Star',
      baseEmoji: '⭐',
      gradient: 'linear-gradient(135deg, #22c55e, #14b8a6, #0ea5e9)',
      options: [
        { word: 'Car', emoji: '🚗', hint: 'Zoom zoom.', example: 'The car drove under the bright star.' },
        { word: 'Jar', emoji: '🍯', hint: 'Holds goodies.', example: 'Cookies in a jar by starlight.' },
        { word: 'Guitar', emoji: '🎸', hint: 'Makes music.', example: 'Play guitar under the stars.' }
      ]
    },
    {
      baseWord: 'Bee',
      baseEmoji: '🐝',
      gradient: 'linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)',
      options: [
        { word: 'Tree', emoji: '🌳', hint: 'Tall and leafy.', example: 'A bee buzzes near the tree.' },
        { word: 'Knee', emoji: '🦵', hint: 'Bend your leg.', example: 'I scraped my knee chasing a bee.' },
        { word: 'Sea', emoji: '🌊', hint: 'Big blue water.', example: 'A bee by the sea is rare to see.' }
      ]
    },
    {
      baseWord: 'Cake',
      baseEmoji: '🎂',
      gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9, #6366f1)',
      options: [
        { word: 'Lake', emoji: '🛶', hint: 'Water to paddle.', example: 'Picnic by the lake with cake.' },
        { word: 'Shake', emoji: '🥤', hint: 'Yummy drink.', example: 'Milkshake and cake make a treat.' },
        { word: 'Snake', emoji: '🐍', hint: 'Long and slithers.', example: 'A snake slithered by the cake.' }
      ]
    }
  ];

  get currentCard(): RhymeCard {
    return this.cards[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.cards.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('rhymes');

    const meta: MetaConfig = {
      title: 'Rhyming Words - Kids Learning App',
      description: 'Tap rhyming words to build early reading skills with sound and examples.',
      keywords: 'rhymes for kids, phonics, early reading, vocabulary',
      image: 'https://yourapp.com/assets/rhymes-preview.jpg',
      url: 'https://yourapp.com/rhymes',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Rhyming Words - Kids Learning App",
      "description": "Interactive rhyming word cards with speech and playful hints.",
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
      this.feedback = '';
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
      this.feedback = '';
    }
  }

  speak(word: string): void {
    this.speechService.speak(word);
  }

  playRhyme(option: RhymeOption): void {
    this.speechService.speak(`${option.word}. ${option.example}`);
    this.feedback = `Great! "${option.word}" rhymes with ${this.currentCard.baseWord}.`;
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('rhymes');
    this.score = this.scoreService.getScore('rhymes');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 1800);
  }
}
