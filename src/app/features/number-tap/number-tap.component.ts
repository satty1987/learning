import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';

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
  maxnumber = Array.from({ length: 20 }, (_, i) => i + 1);
 

  activeNumber: Number | null = null;

  constructor(
    private router: Router,
    private speechService: SpeechService
  ) {}

  goBack(): void {
    this.router.navigate(['/home']);
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
