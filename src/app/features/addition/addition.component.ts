import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface AdditionProblem {
  a: number;
  b: number;
  options: number[];
  clue: string;
}

@Component({
  selector: 'app-addition',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;
  feedback = '';

  problems: AdditionProblem[] = [
    { a: 1, b: 2, options: [2, 3, 4], clue: 'One apple plus two apples' },
    { a: 2, b: 3, options: [5, 4, 6], clue: 'Two birds join three birds' },
    { a: 4, b: 1, options: [4, 6, 5], clue: 'Four blocks and one more' },
    { a: 5, b: 2, options: [7, 6, 8], clue: 'Five stars plus two stars' },
    { a: 3, b: 3, options: [5, 6, 7], clue: 'Three cups plus three cups' },
    { a: 6, b: 2, options: [8, 7, 9], clue: 'Six balloons plus two balloons' },
    { a: 7, b: 1, options: [8, 9, 7], clue: 'Seven crayons and one more' },
    { a: 8, b: 2, options: [9, 10, 11], clue: 'Eight cookies plus two cookies' },
    { a: 9, b: 1, options: [9, 10, 11], clue: 'Nine ducks and one duck' },
    { a: 10, b: 5, options: [14, 15, 16], clue: 'Ten beads plus five beads' }
  ];

  get currentProblem(): AdditionProblem {
    return this.problems[this.currentIndex];
  }

  get answer(): number {
    const { a, b } = this.currentProblem;
    return a + b;
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.problems.length - 1;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('addition');

    const meta: MetaConfig = {
      title: 'Addition Adventure - Kids Learning App',
      description: 'Solve small addition problems with friendly hints and spoken questions.',
      keywords: 'addition for kids, math practice, sums, early math',
      image: 'https://yourapp.com/assets/addition-preview.jpg',
      url: 'https://yourapp.com/addition',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Addition Adventure - Kids Learning App",
      "description": "Interactive addition practice with speech, clues, and celebration.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  previous(): void {
    if (this.canGoPrevious) {
      this.currentIndex--;
      this.feedback = '';
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
      this.feedback = '';
    }
  }

  readQuestion(): void {
    const p = this.currentProblem;
    this.speechService.speak(`${p.clue}. What is ${p.a} plus ${p.b}?`);
  }

  pickOption(option: number): void {
    if (option === this.answer) {
      this.feedback = 'Great job! That is correct.';
      this.speechService.speak(this.feedback);
      this.celebrate();
    } else {
      this.feedback = 'Try again!';
      this.speechService.speak(this.feedback);
    }
  }

  private celebrate(): void {
    this.scoreService.incrementScore('addition');
    this.score = this.scoreService.getScore('addition');
    this.showCelebration = true;

    setTimeout(() => {
      this.showCelebration = false;
    }, 1800);
  }
}
