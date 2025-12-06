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
  selector: 'app-abc-tap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abc-tap.component.html',
  styleUrls: ['./abc-tap.component.css']
})
export class AbcTapComponent {
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

  activeLetter: string | null = null;

  constructor(
    private router: Router,
    private speechService: SpeechService
  ) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  onLetterTap(item: AlphabetItem): void {
    this.activeLetter = item.letter;
    this.speechService.speak(`${item.letter}. ${item.word}`);
    
    // Remove active state after animation
    setTimeout(() => {
      this.activeLetter = null;
    }, 500);
  }

  isActive(letter: string): boolean {
    return this.activeLetter === letter;
  }
}
