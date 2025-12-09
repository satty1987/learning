import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';

interface SequenceItem {
  id: number;
  color: string;
  sound: string;
  emoji: string;
}

@Component({
  selector: 'app-sequence-memory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sequence-memory.component.html',
  styleUrls: ['./sequence-memory.component.css']
})
export class SequenceMemoryComponent implements OnInit {
  items: SequenceItem[] = [
    { id: 0, color: '#ef4444', sound: 'Do', emoji: '🔴' },
    { id: 1, color: '#3b82f6', sound: 'Re', emoji: '🔵' },
    { id: 2, color: '#10b981', sound: 'Mi', emoji: '🟢' },
    { id: 3, color: '#fbbf24', sound: 'Fa', emoji: '🟡' }
  ];

  sequence: number[] = [];
  playerSequence: number[] = [];
  isPlaying = false;
  isPlayerTurn = false;
  level = 1;
  highScore = 0;
  gameOver = false;
  gameStarted = false;
  activeItem: number | null = null;

  constructor(
    private router: Router,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('sequenceMemoryHighScore');
    if (saved) {
      this.highScore = parseInt(saved, 10);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  startGame(): void {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 1;
    this.gameOver = false;
    this.gameStarted = true;
    this.nextRound();
  }

  nextRound(): void {
    this.playerSequence = [];
    this.isPlayerTurn = false;
    
    const randomItem = Math.floor(Math.random() * this.items.length);
    this.sequence.push(randomItem);
    
    setTimeout(() => {
      this.playSequence();
    }, 1000);
  }

  async playSequence(): Promise<void> {
    this.isPlaying = true;
    
    for (let i = 0; i < this.sequence.length; i++) {
      await this.highlightItem(this.sequence[i]);
      await this.delay(200);
    }
    
    this.isPlaying = false;
    this.isPlayerTurn = true;
  }

  async highlightItem(index: number): Promise<void> {
    this.activeItem = index;
    this.speechService.speak(this.items[index].sound);
    await this.delay(600);
    this.activeItem = null;
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onItemClick(index: number): void {
    if (!this.isPlayerTurn || this.isPlaying) return;

    this.playerSequence.push(index);
    this.highlightItem(index);

    const currentStep = this.playerSequence.length - 1;
    if (this.playerSequence[currentStep] !== this.sequence[currentStep]) {
      this.endGame();
      return;
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.level++;
      if (this.level > this.highScore) {
        this.highScore = this.level;
        localStorage.setItem('sequenceMemoryHighScore', this.highScore.toString());
      }
      setTimeout(() => {
        this.nextRound();
      }, 1000);
    }
  }

  endGame(): void {
    this.gameOver = true;
    this.isPlayerTurn = false;
    this.speechService.speak(`Game over! You reached level ${this.level}`);
  }
}
