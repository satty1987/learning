import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface OppositeItem {
  word: string;
  emoji: string;
  hint: string;
}

interface OppositePair {
  theme: string;
  gradient: string;
  left: OppositeItem;
  right: OppositeItem;
  example: string;
}

@Component({
  selector: 'app-opposites',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './opposites.component.html',
  styleUrls: ['./opposites.component.css']
})
export class OppositesComponent implements OnInit {
  currentIndex = 0;
  showOpposite = false;
  showCelebration = false;
  score = 0;

  pairs: OppositePair[] = [
    {
      theme: 'Size',
      gradient: 'linear-gradient(135deg, #a855f7, #6366f1, #22c55e)',
      left: { word: 'Big', emoji: '🐘', hint: 'Takes up lots of space' },
      right: { word: 'Small', emoji: '🐞', hint: 'Fits in your hand' },
      example: 'The elephant is big, but the ladybug is small.'
    },
    {
      theme: 'Temperature',
      gradient: 'linear-gradient(135deg, #f97316, #ef4444, #0ea5e9)',
      left: { word: 'Hot', emoji: '🔥', hint: 'Like summer sun' },
      right: { word: 'Cold', emoji: '🧊', hint: 'Like ice cubes' },
      example: 'Hot chocolate turns cold if you wait too long.'
    },
    {
      theme: 'Speed',
      gradient: 'linear-gradient(135deg, #0ea5e9, #14b8a6, #8b5cf6)',
      left: { word: 'Fast', emoji: '🚀', hint: 'Zooms quickly' },
      right: { word: 'Slow', emoji: '🐢', hint: 'Takes its time' },
      example: 'The rocket is fast, but the turtle is slow.'
    },
    {
      theme: 'Feelings',
      gradient: 'linear-gradient(135deg, #22c55e, #a855f7, #ec4899)',
      left: { word: 'Happy', emoji: '😁', hint: 'Smiling and bright' },
      right: { word: 'Sad', emoji: '😢', hint: 'Needs a hug' },
      example: 'Sharing toys makes us happy, losing one can feel sad.'
    },
    {
      theme: 'Time of Day',
      gradient: 'linear-gradient(135deg, #fbbf24, #fb923c, #0ea5e9)',
      left: { word: 'Day', emoji: '🌞', hint: 'Sun is shining' },
      right: { word: 'Night', emoji: '🌙', hint: 'Stars come out' },
      example: 'We play outside in the day and rest at night.'
    },
    {
      theme: 'Position',
      gradient: 'linear-gradient(135deg, #6366f1, #22c55e, #f59e0b)',
      left: { word: 'Above', emoji: '☁️', hint: 'Up in the air' },
      right: { word: 'Below', emoji: '🪱', hint: 'Down low or underground' },
      example: 'Birds fly above while worms crawl below.'
    },
    {
      theme: 'Sound',
      gradient: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #14b8a6)',
      left: { word: 'Loud', emoji: '📣', hint: 'Needs covered ears' },
      right: { word: 'Quiet', emoji: '🤫', hint: 'Soft and gentle' },
      example: 'A drum is loud, but a whisper is quiet.'
    },
    {
      theme: 'Cleanliness',
      gradient: 'linear-gradient(135deg, #0ea5e9, #22c55e, #f97316)',
      left: { word: 'Clean', emoji: '🧼', hint: 'Fresh and shiny' },
      right: { word: 'Dirty', emoji: '🌧️', hint: 'Needs a wash' },
      example: 'After playing in the mud, your hands get dirty and need to be clean.'
    },
    {
      theme: 'Open & Closed',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #10b981)',
      left: { word: 'Open', emoji: '🚪', hint: 'Door is wide' },
      right: { word: 'Closed', emoji: '🔒', hint: 'Door is shut' },
      example: 'We keep the fridge closed, then open it to grab a snack.'
    },
    {
      theme: 'Weight',
      gradient: 'linear-gradient(135deg, #06b6d4, #2563eb, #a855f7)',
      left: { word: 'Heavy', emoji: '🏋️', hint: 'Hard to lift' },
      right: { word: 'Light', emoji: '🎈', hint: 'Floats or easy to carry' },
      example: 'A backpack full of books is heavy, a balloon is light.'
    }
  ];

  get currentPair(): OppositePair {
    return this.pairs[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.pairs.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('opposites');

    const meta: MetaConfig = {
      title: 'Opposites - Kids Learning App',
      description: 'Practice opposite words with colorful cards, sounds, and simple examples.',
      keywords: 'opposites for kids, antonyms, early learning, vocabulary',
      image: 'https://yourapp.com/assets/opposites-preview.jpg',
      url: 'https://yourapp.com/opposites',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Opposites - Kids Learning App",
      "description": "Interactive opposite word flashcards with speech and examples.",
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
      this.showOpposite = false;
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
      this.showOpposite = false;
    }
  }

  revealOpposite(): void {
    if (!this.showOpposite) {
      this.showOpposite = true;
      this.celebrate();
    }
  }

  speak(word: string): void {
    this.speechService.speak(word);
  }

  speakPair(): void {
    const pair = this.currentPair;
    this.speechService.speak(`${pair.left.word} and ${pair.right.word}`);
  }

  private celebrate(): void {
    this.scoreService.incrementScore('opposites');
    this.score = this.scoreService.getScore('opposites');
    this.showCelebration = true;

    setTimeout(() => {
      this.showCelebration = false;
    }, 1800);
  }
}
