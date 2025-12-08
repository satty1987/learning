import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface Card {
  id: number;
  content: string;
  type: 'letter' | 'emoji';
  pair: string;
  flipped: boolean;
  matched: boolean;
}

interface GameLevel {
  name: string;
  pairs: Array<{ letter: string; emoji: string; word: string }>;
}

@Component({
  selector: 'app-memory-match',
  standalone: true,
  imports: [CommonModule, CelebrationComponent],
  templateUrl: './memory-match.component.html',
  styleUrls: ['./memory-match.component.css']
})
export class MemoryMatchComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;
  matches = 0;
  totalPairs = 0;
  gameStarted = false;
  gameCompleted = false;
  showCelebration = false;
  selectedLevel = 0;
  isChecking = false;

  levels: GameLevel[] = [
    {
      name: 'Easy (4 pairs)',
      pairs: [
        { letter: 'A', emoji: '🍎', word: 'Apple' },
        { letter: 'B', emoji: '🎈', word: 'Balloon' },
        { letter: 'C', emoji: '🐱', word: 'Cat' },
        { letter: 'D', emoji: '🐕', word: 'Dog' }
      ]
    },
    {
      name: 'Medium (6 pairs)',
      pairs: [
        { letter: 'A', emoji: '🍎', word: 'Apple' },
        { letter: 'B', emoji: '🎈', word: 'Balloon' },
        { letter: 'C', emoji: '🐱', word: 'Cat' },
        { letter: 'D', emoji: '🐕', word: 'Dog' },
        { letter: 'E', emoji: '🐘', word: 'Elephant' },
        { letter: 'F', emoji: '🦊', word: 'Fox' }
      ]
    },
    {
      name: 'Hard (8 pairs)',
      pairs: [
        { letter: 'A', emoji: '🍎', word: 'Apple' },
        { letter: 'B', emoji: '🎈', word: 'Balloon' },
        { letter: 'C', emoji: '🐱', word: 'Cat' },
        { letter: 'D', emoji: '🐕', word: 'Dog' },
        { letter: 'E', emoji: '🐘', word: 'Elephant' },
        { letter: 'F', emoji: '🦊', word: 'Fox' },
        { letter: 'G', emoji: '🦒', word: 'Giraffe' },
        { letter: 'L', emoji: '🦁', word: 'Lion' }
      ]
    }
  ];

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    // Start with easy level by default
    const meta: MetaConfig = {
      title: 'Memory Match Game - Kids Learning App',
      description: 'Play the memory match game to pair letters and pictures — great for retention and fun.',
      keywords: 'memory match, memory game, kids game, matching game',
      image: 'https://yourapp.com/assets/memory-match-preview.jpg',
      url: 'https://yourapp.com/memory-match',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Memory Match Game - Kids Learning App",
      "description": "A fun memory matching game for children to match letters and pictures.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  selectLevel(index: number): void {
    this.selectedLevel = index;
    this.startGame();
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameCompleted = false;
    this.moves = 0;
    this.matches = 0;
    this.flippedCards = [];
    this.isChecking = false;

    const level = this.levels[this.selectedLevel];
    this.totalPairs = level.pairs.length;

    // Create cards array with letters and emojis
    const cardsArray: Card[] = [];
    let id = 0;

    level.pairs.forEach(pair => {
      // Letter card
      cardsArray.push({
        id: id++,
        content: pair.letter,
        type: 'letter',
        pair: pair.emoji,
        flipped: false,
        matched: false
      });
      // Emoji card
      cardsArray.push({
        id: id++,
        content: pair.emoji,
        type: 'emoji',
        pair: pair.letter,
        flipped: false,
        matched: false
      });
    });

    // Shuffle cards
    this.cards = this.shuffleArray(cardsArray);
  }

  shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  onCardClick(card: Card): void {
    // Prevent clicking if checking, already flipped, or matched
    if (this.isChecking || card.flipped || card.matched || this.flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    card.flipped = true;
    this.flippedCards.push(card);

    // Speak the card content
    if (card.type === 'letter') {
      this.speechService.speak(card.content);
    }

    // Check if two cards are flipped
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.isChecking = true;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;

    // Check if cards match (letter matches emoji)
    if (card1.pair === card2.content || card2.pair === card1.content) {
      // Match found!
      setTimeout(() => {
        card1.matched = true;
        card2.matched = true;
        this.matches++;
        this.flippedCards = [];
        this.isChecking = false;

        // Show celebration
        this.showCelebration = true;
        setTimeout(() => {
          this.showCelebration = false;
        }, 1000);

        // Check if game completed
        if (this.matches === this.totalPairs) {
          setTimeout(() => {
            this.gameCompleted = true;
            this.showCelebration = true;
            this.speechService.speak(`Amazing! You completed the game in ${this.moves} moves!`);
            setTimeout(() => {
              this.showCelebration = false;
            }, 3000);
          }, 500);
        }
      }, 500);
    } else {
      // No match - flip cards back
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
        this.isChecking = false;
      }, 1000);
    }
  }

  resetGame(): void {
    this.startGame();
  }

  backToLevels(): void {
    this.gameStarted = false;
    this.cards = [];
  }

  get gridClass(): string {
    const pairCount = this.totalPairs;
    if (pairCount <= 4) return 'grid-small';
    if (pairCount <= 6) return 'grid-medium';
    return 'grid-large';
  }
}
