import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Scores {
  abc: number;
  numbers: number;
  colors: number;
  shapes: number;
  animals: number;
  quiz: number;
  opposites: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoresSubject = new BehaviorSubject<Scores>({
    abc: 0,
    numbers: 0,
    colors: 0,
    shapes: 0,
    animals: 0,
    quiz: 0,
    opposites: 0
  });

  scores$ = this.scoresSubject.asObservable();

  incrementScore(category: keyof Scores): void {
    const currentScores = this.scoresSubject.value;
    this.scoresSubject.next({
      ...currentScores,
      [category]: currentScores[category] + 1
    });
  }

  getScore(category: keyof Scores): number {
    return this.scoresSubject.value[category];
  }

  resetScore(category: keyof Scores): void {
    const currentScores = this.scoresSubject.value;
    this.scoresSubject.next({
      ...currentScores,
      [category]: 0
    });
  }
}
