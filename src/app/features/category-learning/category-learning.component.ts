import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { CelebrationComponent } from '../../shared/components/celebration/celebration.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

interface CategoryItem {
  name: string;
  emoji: string;
  description?: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: CategoryItem[];
}

@Component({
  selector: 'app-category-learning',
  standalone: true,
  imports: [CommonModule, CelebrationComponent, NavigationComponent],
  templateUrl: './category-learning.component.html',
  styleUrls: ['./category-learning.component.css']
})
export class CategoryLearningComponent implements OnInit {
  currentIndex = 0;
  score = 0;
  showCelebration = false;
  categoryId: string = '';
  category: Category | null = null;

  // All available categories
  categories: { [key: string]: Category } = {
    'animals': {
      id: 'animals',
      title: 'Animals',
      icon: '🦁',
      color: 'linear-gradient(135deg, #10b981, #059669, #14b8a6)',
      items: [
        { name: 'Dog', emoji: '🐶', description: 'A loyal pet' },
        { name: 'Cat', emoji: '🐱', description: 'A playful pet' },
        { name: 'Lion', emoji: '🦁', description: 'King of the jungle' },
        { name: 'Elephant', emoji: '🐘', description: 'Largest land animal' },
        { name: 'Giraffe', emoji: '🦒', description: 'Tallest animal' },
        { name: 'Zebra', emoji: '🦓', description: 'Black and white stripes' },
        { name: 'Monkey', emoji: '🐵', description: 'Loves bananas' },
        { name: 'Penguin', emoji: '🐧', description: 'Cannot fly' },
        { name: 'Bear', emoji: '🐻', description: 'Loves honey' },
        { name: 'Rabbit', emoji: '🐰', description: 'Hops around' }
      ]
    },
    'fruits': {
      id: 'fruits',
      title: 'Fruits',
      icon: '🍎',
      color: 'linear-gradient(135deg, #ef4444, #f97316, #fbbf24)',
      items: [
        { name: 'Apple', emoji: '🍎', description: 'Red and crunchy' },
        { name: 'Banana', emoji: '🍌', description: 'Yellow and sweet' },
        { name: 'Orange', emoji: '🍊', description: 'Full of vitamin C' },
        { name: 'Grapes', emoji: '🍇', description: 'Small and juicy' },
        { name: 'Strawberry', emoji: '🍓', description: 'Red berry' },
        { name: 'Watermelon', emoji: '🍉', description: 'Big and juicy' },
        { name: 'Pineapple', emoji: '🍍', description: 'Tropical fruit' },
        { name: 'Cherry', emoji: '🍒', description: 'Small and red' },
        { name: 'Peach', emoji: '🍑', description: 'Soft and fuzzy' },
        { name: 'Mango', emoji: '🥭', description: 'King of fruits' }
      ]
    },
    'vegetables': {
      id: 'vegetables',
      title: 'Vegetables',
      icon: '🥕',
      color: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
      items: [
        { name: 'Carrot', emoji: '🥕', description: 'Orange and crunchy' },
        { name: 'Broccoli', emoji: '🥦', description: 'Green and healthy' },
        { name: 'Tomato', emoji: '🍅', description: 'Red and juicy' },
        { name: 'Corn', emoji: '🌽', description: 'Yellow kernels' },
        { name: 'Potato', emoji: '🥔', description: 'Can be fried' },
        { name: 'Pepper', emoji: '🫑', description: 'Green or red' },
        { name: 'Cucumber', emoji: '🥒', description: 'Green and fresh' },
        { name: 'Onion', emoji: '🧅', description: 'Makes you cry' },
        { name: 'Eggplant', emoji: '🍆', description: 'Purple vegetable' },
        { name: 'Lettuce', emoji: '🥬', description: 'Green leaves' }
      ]
    },
    'vehicles': {
      id: 'vehicles',
      title: 'Vehicles',
      icon: '🚗',
      color: 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',
      items: [
        { name: 'Car', emoji: '🚗', description: 'Drives on roads' },
        { name: 'Bus', emoji: '🚌', description: 'Carries many people' },
        { name: 'Truck', emoji: '🚚', description: 'Carries heavy things' },
        { name: 'Bicycle', emoji: '🚲', description: 'Has two wheels' },
        { name: 'Airplane', emoji: '✈️', description: 'Flies in the sky' },
        { name: 'Train', emoji: '🚂', description: 'Runs on tracks' },
        { name: 'Boat', emoji: '⛵', description: 'Floats on water' },
        { name: 'Motorcycle', emoji: '🏍️', description: 'Fast two-wheeler' },
        { name: 'Helicopter', emoji: '🚁', description: 'Has spinning blades' },
        { name: 'Rocket', emoji: '🚀', description: 'Goes to space' }
      ]
    },
    'foods': {
      id: 'foods',
      title: 'Foods',
      icon: '🍕',
      color: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
      items: [
        { name: 'Pizza', emoji: '🍕', description: 'Round and cheesy' },
        { name: 'Burger', emoji: '🍔', description: 'Between two buns' },
        { name: 'Hot Dog', emoji: '🌭', description: 'Sausage in bread' },
        { name: 'Sandwich', emoji: '🥪', description: 'Between bread slices' },
        { name: 'Taco', emoji: '🌮', description: 'Mexican food' },
        { name: 'Sushi', emoji: '🍣', description: 'Japanese food' },
        { name: 'Pasta', emoji: '🍝', description: 'Italian noodles' },
        { name: 'Rice', emoji: '🍚', description: 'White grains' },
        { name: 'Bread', emoji: '🍞', description: 'Baked from flour' },
        { name: 'Cake', emoji: '🍰', description: 'Sweet dessert' }
      ]
    },
    'sports': {
      id: 'sports',
      title: 'Sports',
      icon: '⚽',
      color: 'linear-gradient(135deg, #ec4899, #db2777, #be185d)',
      items: [
        { name: 'Soccer', emoji: '⚽', description: 'Kick the ball' },
        { name: 'Basketball', emoji: '🏀', description: 'Shoot hoops' },
        { name: 'Baseball', emoji: '⚾', description: 'Hit with bat' },
        { name: 'Tennis', emoji: '🎾', description: 'Hit with racket' },
        { name: 'Football', emoji: '🏈', description: 'American game' },
        { name: 'Volleyball', emoji: '🏐', description: 'Hit over net' },
        { name: 'Swimming', emoji: '🏊', description: 'In the water' },
        { name: 'Running', emoji: '🏃', description: 'Fast on feet' },
        { name: 'Cycling', emoji: '🚴', description: 'Ride a bike' },
        { name: 'Skiing', emoji: '⛷️', description: 'On snow' }
      ]
    },
    'weather': {
      id: 'weather',
      title: 'Weather',
      icon: '☀️',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)',
      items: [
        { name: 'Sunny', emoji: '☀️', description: 'Bright and warm' },
        { name: 'Rainy', emoji: '🌧️', description: 'Water falling' },
        { name: 'Cloudy', emoji: '☁️', description: 'Sky is covered' },
        { name: 'Snowy', emoji: '❄️', description: 'White and cold' },
        { name: 'Windy', emoji: '💨', description: 'Air is moving' },
        { name: 'Stormy', emoji: '⛈️', description: 'Thunder and lightning' },
        { name: 'Foggy', emoji: '🌫️', description: 'Hard to see' },
        { name: 'Rainbow', emoji: '🌈', description: 'After the rain' },
        { name: 'Hot', emoji: '🔥', description: 'Very warm' },
        { name: 'Cold', emoji: '🧊', description: 'Very chilly' }
      ]
    },
    'body-parts': {
      id: 'body-parts',
      title: 'Body Parts',
      icon: '👁️',
      color: 'linear-gradient(135deg, #a855f7, #9333ea, #7e22ce)',
      items: [
        { name: 'Eyes', emoji: '👁️', description: 'We see with them' },
        { name: 'Nose', emoji: '👃', description: 'We smell with it' },
        { name: 'Mouth', emoji: '👄', description: 'We eat with it' },
        { name: 'Ears', emoji: '👂', description: 'We hear with them' },
        { name: 'Hands', emoji: '✋', description: 'We hold things' },
        { name: 'Feet', emoji: '🦶', description: 'We walk with them' },
        { name: 'Head', emoji: '🧠', description: 'Our brain is here' },
        { name: 'Heart', emoji: '❤️', description: 'Pumps blood' },
        { name: 'Legs', emoji: '🦵', description: 'We stand on them' },
        { name: 'Arms', emoji: '💪', description: 'We lift things' }
      ]
    }
  };

  get currentItem(): CategoryItem | null {
    if (!this.category) return null;
    return this.category.items[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.category ? this.currentIndex < this.category.items.length - 1 : false;
  }

  get categoryColor(): string {
    return this.category?.color || 'linear-gradient(135deg, #6366f1, #8b5cf6)';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speechService: SpeechService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    // Get category from route parameter
    this.route.params.subscribe(params => {
      this.categoryId = params['category'];
      this.category = this.categories[this.categoryId] || null;

      if (!this.category) {
        // Invalid category, redirect to home
        this.router.navigate(['/home']);
      } else {
        // Load score for this category
        this.score = this.scoreService.getScore(this.categoryId as any) || 0;
      }
    });
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

  speakItem(): void {
    if (this.currentItem) {
      const text = this.currentItem.description 
        ? `${this.currentItem.name}. ${this.currentItem.description}`
        : this.currentItem.name;
      this.speechService.speak(text);
      this.celebrate();
    }
  }

  private celebrate(): void {
    if (this.category) {
      this.scoreService.incrementScore(this.categoryId as any);
      this.score = this.scoreService.getScore(this.categoryId as any) || 0;
    }
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
    }, 2000);
  }
}
