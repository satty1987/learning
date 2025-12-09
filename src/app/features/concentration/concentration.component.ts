import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';

interface ConcentrationCard {
  id: number;
  emoji: string;
  name: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-concentration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concentration.component.html',
  styleUrls: ['./concentration.component.css']
})
export class ConcentrationComponent {
  cards: ConcentrationCard[] = [];
  flippedCards: ConcentrationCard[] = [];
  moves = 0;
  matches = 0;
  timer = 0;
  timerInterval: any;
  gameStarted = false;
  gameCompleted = false;
  difficulty: 'easy' | 'medium' | 'hard' | null = null;
  isChecking = false;

  pairs = {
    easy: [
      { emoji: '🍎', name: 'Apple' },
      { emoji: '🍌', name: 'Banana' },
      { emoji: '🍇', name: 'Grapes' },
      { emoji: '🍊', name: 'Orange' }
    ],
    medium: [
      { emoji: '🐶', name: 'Dog' },
      { emoji: '🐱', name: 'Cat' },
      { emoji: '🦁', name: 'Lion' },
      { emoji: '🐘', name: 'Elephant' },
      { emoji: '🦒', name: 'Giraffe' },
      { emoji: '🐻', name: 'Bear' }
    ],
    hard: [
      { emoji: '🚗', name: 'Car' },
      { emoji: '🚌', name: 'Bus' },
      { emoji: '✈️', name: 'Plane' },
      { emoji: '🚂', name: 'Train' },
      { emoji: '🚲', name: 'Bike' },
      { emoji: '🚁', name: 'Helicopter' },
      { emoji: '🚀', name: 'Rocket' },
      { emoji: '⛵', name: 'Boat' }
    ]
  };

  constructor(
    private router: Router,
    private speechService: SpeechService
  ) {}

  goBack(): void {
    this.router.navigate(['/home']);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  selectDifficulty(level: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = level;
    this.startGame();
  }

  startGame(): void {
    if (!this.difficulty) return;

    this.moves = 0;
    this.matches = 0;
    this.timer = 0;
    this.gameCompleted = false;
    this.flippedCards = [];
    this.isChecking = false;

    const selectedPairs = this.pairs[this.difficulty];
    const cardsArray: ConcentrationCard[] = [];
    let id = 0;

    selectedPairs.forEach(pair => {
      cardsArray.push({
        id: id++,
        emoji: pair.emoji,
        name: pair.name,
        flipped: false,
        matched: false
      });
      cardsArray.push({
        id: id++,
        emoji: pair.emoji,
        name: pair.name,
        flipped: false,
        matched: false
      });
    });

    this.cards = cardsArray.sort(() => Math.random() - 0.5);
    this.gameStarted = true;

    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  onCardClick(card: ConcentrationCard): void {
    if (this.isChecking || card.flipped || card.matched || this.flippedCards.length >= 2) {
      return;
    }

    card.flipped = true;
    this.flippedCards.push(card);
    this.speechService.speak(card.name);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.isChecking = true;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.emoji === card2.emoji && card1.id !== card2.id) {
      setTimeout(() => {
        card1.matched = true;
        card2.matched = true;
        this.matches++;
        this.flippedCards = [];
        this.isChecking = false;

        if (this.matches === this.cards.length / 2) {
          this.completeGame();
        }
      }, 500);
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
        this.isChecking = false;
      }, 1000);
    }
  }

  completeGame(): void {
    clearInterval(this.timerInterval);
    this.gameCompleted = true;
    this.speechService.speak(`Congratulations! You completed in ${this.formatTime(this.timer)} with ${this.moves} moves!`);
  }

  resetGame(): void {
    this.difficulty = null;
    this.gameStarted = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get gridClass(): string {
    if (this.difficulty === 'easy') return 'grid-4';
    if (this.difficulty === 'medium') return 'grid-4';
    return 'grid-4';
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}