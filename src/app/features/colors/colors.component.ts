import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

interface ColorItem {
  name: string;
  hex: string;
  emoji: string;
}

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;

  colors: ColorItem[] = [
    { name: 'Red', hex: '#ef4444', emoji: '🔴' },
    { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
    { name: 'Green', hex: '#10b981', emoji: '🟢' },
    { name: 'Yellow', hex: '#fbbf24', emoji: '🟡' },
    { name: 'Orange', hex: '#f97316', emoji: '🟠' },
    { name: 'Purple', hex: '#a855f7', emoji: '🟣' },
    { name: 'Pink', hex: '#ec4899', emoji: '🌸' },
    { name: 'Brown', hex: '#92400e', emoji: '🟤' },
    { name: 'Black', hex: '#1f2937', emoji: '⚫' },
    { name: 'White', hex: '#f9fafb', emoji: '⚪' }
  ];

  get currentColor(): ColorItem {
    return this.colors[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.colors.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('colors');
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

  sayColor(): void {
    this.speechService.speak(this.currentColor.name);
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('colors');
    this.score = this.scoreService.getScore('colors');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}
