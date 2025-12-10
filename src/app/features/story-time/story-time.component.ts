import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';

interface Story {
  id: string;
  title: string;
  emoji: string;
  pages: StoryPage[];
}

interface StoryPage {
  text: string;
  image: string;
  question?: string;
  choices?: string[];
  correctAnswer?: number;
}

@Component({
  selector: 'app-story-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-time.component.html',
  styleUrls: ['./story-time.component.css']
})
export class StoryTimeComponent {
  stories: Story[] = [
    {
      id: 'three-bears',
      title: 'Goldilocks and Three Bears',
      emoji: '🐻',
      pages: [
        {
          text: 'Once upon a time, there were three bears who lived in a house in the forest.',
          image: '🏠🐻👨‍👩‍👧',
          question: 'How many bears lived in the house?',
          choices: ['One', 'Two', 'Three', 'Four'],
          correctAnswer: 2
        },
        {
          text: 'One day, a little girl named Goldilocks came to their house.',
          image: '👧🏠',
          question: 'What was the girl\'s name?',
          choices: ['Cinderella', 'Goldilocks', 'Snow White', 'Belle'],
          correctAnswer: 1
        },
        {
          text: 'She tried all three bowls of porridge and found one just right!',
          image: '🥣🥣🥣',
          question: 'What did Goldilocks eat?',
          choices: ['Pizza', 'Cake', 'Porridge', 'Ice cream'],
          correctAnswer: 2
        },
        {
          text: 'The bears came home and found Goldilocks sleeping in Baby Bear\'s bed!',
          image: '🐻🐻🐻👧🛏️',
          question: 'Where was Goldilocks sleeping?',
          choices: ['Sofa', 'Floor', 'Baby Bear\'s bed', 'Kitchen'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'little-red',
      title: 'Little Red Riding Hood',
      emoji: '🧒',
      pages: [
        {
          text: 'Little Red Riding Hood went to visit her grandmother in the forest.',
          image: '👧🌲🏡',
          question: 'Where did grandmother live?',
          choices: ['City', 'Beach', 'Forest', 'Mountain'],
          correctAnswer: 2
        },
        {
          text: 'On the way, she met a big wolf who wanted to trick her.',
          image: '🐺👧',
          question: 'What animal did she meet?',
          choices: ['Bear', 'Wolf', 'Fox', 'Lion'],
          correctAnswer: 1
        },
        {
          text: 'The wolf ran to grandmother\'s house and knocked on the door.',
          image: '🐺🏡🚪',
          question: 'What did the wolf do?',
          choices: ['Slept', 'Ate', 'Knocked on door', 'Ran away'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'three-pigs',
      title: 'Three Little Pigs',
      emoji: '🐷',
      pages: [
        {
          text: 'Three little pigs built three houses: one of straw, one of sticks, and one of bricks.',
          image: '🐷🐷🐷🏠',
          question: 'What was the strongest house made of?',
          choices: ['Straw', 'Sticks', 'Bricks', 'Wood'],
          correctAnswer: 2
        },
        {
          text: 'A big bad wolf came and tried to blow the houses down!',
          image: '🐺💨🏠',
          question: 'What did the wolf try to do?',
          choices: ['Sing', 'Dance', 'Blow houses down', 'Help them'],
          correctAnswer: 2
        },
        {
          text: 'Only the brick house was strong enough. The three pigs were safe!',
          image: '🐷🐷🐷🏠✅',
          question: 'Which house stayed strong?',
          choices: ['Straw house', 'Stick house', 'Brick house', 'All houses'],
          correctAnswer: 2
        }
      ]
    }
  ];

  selectedStory: Story | null = null;
  currentPage = 0;
  score = 0;
  showQuestion = false;
  selectedAnswer: number | null = null;
  showResult = false;
  isCorrect = false;

  constructor(
    private router: Router,
    private speechService: SpeechService
  ) {}

  selectStory(story: Story): void {
    this.selectedStory = story;
    this.currentPage = 0;
    this.score = 0;
    this.showQuestion = false;
    this.selectedAnswer = null;
    this.showResult = false;
  }

  get currentStoryPage(): StoryPage | null {
    if (!this.selectedStory) return null;
    return this.selectedStory.pages[this.currentPage];
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0 && !this.showQuestion;
  }

  get canGoNext(): boolean {
    if (!this.selectedStory) return false;
    return this.currentPage < this.selectedStory.pages.length - 1 && !this.showQuestion;
  }

  readPage(): void {
    if (this.currentStoryPage) {
      this.speechService.speak(this.currentStoryPage.text);
    }
  }

  nextPage(): void {
    if (!this.selectedStory) return;

    if (this.currentStoryPage?.question && !this.showQuestion && !this.showResult) {
      this.showQuestion = true;
    } else if (this.showResult) {
      this.showResult = false;
      this.showQuestion = false;
      this.selectedAnswer = null;
      
      if (this.currentPage < this.selectedStory.pages.length - 1) {
        this.currentPage++;
      } else {
        this.completeStory();
      }
    }
  }

  previousPage(): void {
    if (this.canGoPrevious) {
      this.currentPage--;
    }
  }

  selectAnswer(index: number): void {
    this.selectedAnswer = index;
  }

  submitAnswer(): void {
    if (this.selectedAnswer === null || !this.currentStoryPage) return;

    this.isCorrect = this.selectedAnswer === this.currentStoryPage.correctAnswer;
    
    if (this.isCorrect) {
      this.score += 10;
      this.speechService.speak('Correct! Well done!');
    } else {
      this.speechService.speak('Try again next time!');
    }

    this.showResult = true;
    this.showQuestion = false;
  }

  completeStory(): void {
    this.speechService.speak(`Great job! You finished the story! Your score is ${this.score} points!`);
    setTimeout(() => {
      this.selectedStory = null;
      this.currentPage = 0;
      this.score = 0;
    }, 3000);
  }

  goBack(): void {
    if (this.selectedStory) {
      this.selectedStory = null;
    } else {
      this.router.navigate(['/home']);
    }
  }
}
