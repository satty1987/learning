import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

interface AnimalItem {
  name: string;
  emoji: string;
  sound: string;
}

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;

  animals: AnimalItem[] = [
    { name: 'Dog', emoji: '🐶', sound: 'Woof woof!' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow meow!' },
    { name: 'Cow', emoji: '🐮', sound: 'Moo moo!' },
    { name: 'Sheep', emoji: '🐑', sound: 'Baa baa!' },
    { name: 'Duck', emoji: '🦆', sound: 'Quack quack!' },
    { name: 'Lion', emoji: '🦁', sound: 'Roar!' },
    { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!' },
    { name: 'Monkey', emoji: '🐵', sound: 'Ooh ooh ah ah!' },
    { name: 'Bird', emoji: '🐦', sound: 'Tweet tweet!' },
    { name: 'Frog', emoji: '🐸', sound: 'Ribbit ribbit!' }
  ];

  get currentAnimal(): AnimalItem {
    return this.animals[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.animals.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('animals');
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

  sayAnimal(): void {
    this.speechService.speak(`${this.currentAnimal.name} says ${this.currentAnimal.sound}`);
    this.celebrate();
  }

  private celebrate(): void {
    this.scoreService.incrementScore('animals');
    this.score = this.scoreService.getScore('animals');
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}
