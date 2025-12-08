import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface QuizAnswers {
  name: string;
  father: string;
  mother: string;
  age: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, CelebrationComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  answers: QuizAnswers = {
    name: '',
    father: '',
    mother: '',
    age: ''
  };

  savedFields: Set<string> = new Set();
  showMessage = false;
  message = '';
  messageType: 'success' | 'warning' | 'error' = 'success';
  showCelebration = false;

  get completedCount(): number {
    return Object.values(this.answers).filter(v => v.trim() !== '').length;
  }

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private metaService: MetaTagsService
  ) {
    const meta: MetaConfig = {
      title: 'About Me Quiz - Kids Learning App',
      description: 'A fun little quiz for kids to tell us about themselves — name, age and family details.',
      keywords: 'kids quiz, about me, childrens quiz',
      image: 'https://yourapp.com/assets/quiz-preview.jpg',
      url: 'https://yourapp.com/quiz',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "About Me Quiz - Kids Learning App",
      "description": "A friendly quiz where kids can answer simple personal questions.",
      "applicationCategory": "EducationalApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    this.metaService.injectMetaTags(meta, schema);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  saveAnswer(field: keyof QuizAnswers): void {
    if (this.answers[field].trim()) {
      this.savedFields.add(field);
      this.showCelebration = true;
      setTimeout(() => {
        this.showCelebration = false;
      }, 1000);
    }
  }

  isSaved(field: keyof QuizAnswers): boolean {
    return this.savedFields.has(field);
  }

  reviewAnswers(): void {
    if (this.completedCount === 0) {
      this.showMessageBox('📝 Please answer at least one question!', 'error');
    } else if (this.completedCount === 4) {
      let msg = '🎉 Amazing! Here is what you told me:\n\n';
      if (this.answers.name) msg += `👤 Your name is ${this.answers.name}\n`;
      if (this.answers.father) msg += `👨 Your father is ${this.answers.father}\n`;
      if (this.answers.mother) msg += `👩 Your mother is ${this.answers.mother}\n`;
      if (this.answers.age) msg += `🎂 You are ${this.answers.age} years old`;
      
      this.showMessageBox(msg, 'success');
      this.speechService.speak(`Great job! Your name is ${this.answers.name}, you are ${this.answers.age} years old!`);
    } else {
      this.showMessageBox(`📝 You have answered ${this.completedCount} out of 4 questions. Keep going!`, 'warning');
    }
  }

  private showMessageBox(msg: string, type: 'success' | 'warning' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
}