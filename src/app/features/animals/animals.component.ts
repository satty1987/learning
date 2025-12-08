import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

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
    private scoreService: ScoreService,
    private metaService: MetaTagsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getScore('animals');

    const meta: MetaConfig = {
      title: 'Animal Sounds - Kids Learning App',
      description: 'Learn animals and their sounds with interactive cards and voices for kids.',
      keywords: 'animals, animal sounds, kids learning, animals for kids',
      image: 'https://yourapp.com/assets/animals-preview.jpg',
      url: 'https://yourapp.com/animals',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Animal Sounds - Kids Learning App",
      "description": "Interactive animal sounds and pictures for children.",
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
