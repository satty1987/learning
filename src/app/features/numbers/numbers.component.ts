import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;
  maxNumber = 20;

  numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟',
                  '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'];

  get currentNumber(): number {
    return this.currentIndex + 1;
  }

  get currentEmoji(): string {
    return this.numberEmojis[this.currentIndex];
  }

  get dots(): number[] {
    return Array(this.currentNumber).fill(0);
  }

  get dotClass(): string {
    return this.currentNumber > 10 ? 'dot dot-small' : 'dot';
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.maxNumber - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('numbers');
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

  sayNumber(): void {
    this.speechService.speak(this.currentNumber.toString());
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('numbers');
    this.score = this.scoreService.getScore('numbers');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }

  getDotDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}