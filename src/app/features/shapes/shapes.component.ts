import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

interface ShapeItem {
  name: string;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'rectangle' | 'pentagon' | 'hexagon' | 'octagon' | 'diamond';
  emoji?: string;
}

@Component({
  selector: 'app-shapes',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './shapes.component.html',
  styleUrls: ['./shapes.component.css']
})
export class ShapesComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;

  shapes: ShapeItem[] = [
    { name: 'Circle', type: 'circle' },
    { name: 'Square', type: 'square' },
    { name: 'Rectangle', type: 'rectangle' },
    { name: 'Triangle', type: 'triangle' },
    { name: 'Diamond', type: 'diamond' },
    { name: 'Pentagon', type: 'pentagon' },
    { name: 'Hexagon', type: 'hexagon' },
    { name: 'Octagon', type: 'octagon' },
    { name: 'Star', type: 'star', emoji: '⭐' },
    { name: 'Heart', type: 'heart', emoji: '❤️' }
  ];

  get currentShape(): ShapeItem {
    return this.shapes[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.shapes.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('shapes');
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

  sayShape(): void {
    this.speechService.speak(this.currentShape.name);
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('shapes');
    this.score = this.scoreService.getScore('shapes');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}