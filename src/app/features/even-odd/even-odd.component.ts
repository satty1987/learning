import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface ParityCard {
  value: number;
  hint: string;
  reasoning: string;
}

@Component({
  selector: 'app-even-odd',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './even-odd.component.html',
  styleUrls: ['./even-odd.component.css']
})
export class EvenOddComponent implements OnInit {
  cards: ParityCard[] = [
    { value: 2, hint: 'Two shoes make one pair.', reasoning: '2 splits into one perfect pair.' },
    { value: 3, hint: 'Three little pigs had one extra.', reasoning: '3 leaves one out when you make pairs.' },
    { value: 4, hint: 'Cars roll on four wheels.', reasoning: '4 makes two tidy pairs.' },
    { value: 5, hint: 'Five fingers on one hand.', reasoning: '5 always has one friend without a pair.' },
    { value: 6, hint: 'Six slices can be shared in pairs.', reasoning: '6 groups into three pairs.' },
    { value: 7, hint: 'Seven days in a week.', reasoning: '7 leaves one day without a partner.' },
    { value: 8, hint: 'Spiders have eight legs.', reasoning: '8 makes four equal pairs.' },
    { value: 9, hint: 'Nine squares in tic-tac-toe.', reasoning: '9 leaves one extra square when pairing.' },
    { value: 10, hint: 'Ten fingers make five pairs.', reasoning: '10 is five pairs of two.' },
    { value: 11, hint: 'Eleven soccer players and a ball.', reasoning: '11 keeps one number solo.' },
    { value: 12, hint: 'A dozen eggs fits in pairs.', reasoning: '12 makes six neat pairs.' }
  ];

  currentIndex = 0;
  feedback = '';
  showCelebration = false;
  score = 0;

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('evenOdd');

    const meta: MetaConfig = {
      title: 'Even or Odd Explorer - Kids Learning App',
      description: 'Decide if numbers are even or odd with kid-friendly hints and spoken prompts.',
      keywords: 'even numbers, odd numbers, math for kids, number sense',
      image: 'https://yourapp.com/assets/even-odd-preview.jpg',
      url: 'https://yourapp.com/even-odd',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Even or Odd Explorer - Kids Learning App",
      "description": "Practice even and odd numbers with hints, speech, and celebration animations.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  get currentCard(): ParityCard {
    return this.cards[this.currentIndex];
  }

  get parityLabel(): 'even' | 'odd' {
    return this.currentCard.value % 2 === 0 ? 'even' : 'odd';
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.cards.length - 1;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  speakCard(): void {
    const card = this.currentCard;
    this.speechService.speak(`${card.value}. ${card.hint} Is it even or odd?`);
  }

  answer(choice: 'even' | 'odd'): void {
    const correctParity = this.parityLabel;
    const card = this.currentCard;
    const baseMessage = `${card.value} is ${correctParity}. ${card.reasoning}`;
    const isCorrect = choice === correctParity;

    if (isCorrect) {
      this.feedback = `Great! ${baseMessage}`;
      this.scoreService.incrementScore('evenOdd');
      this.score = this.scoreService.getScore('evenOdd');
      this.speechService.speak(this.feedback);
      this.triggerCelebration();
      this.queueNext();
    } else {
      this.feedback = `Almost! ${baseMessage}`;
      this.speechService.speak(this.feedback);
    }
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

  restart(): void {
    this.currentIndex = 0;
    this.feedback = '';
    this.scoreService.resetScore('evenOdd');
    this.score = 0;
  }

  private triggerCelebration(): void {
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 1600);
  }

  private queueNext(): void {
    if (this.canGoNext) {
      setTimeout(() => {
        this.next();
      }, 850);
    }
  }
}
