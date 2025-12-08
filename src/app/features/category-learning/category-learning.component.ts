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
    },
    'days': {
    id: 'days',
    title: 'Days of the Week',
    icon: '📅',
    color: 'linear-gradient(135deg, #0ea5e9, #0284c7, #0369a1)',
    items: [
      { name: 'Monday', emoji: '📘', description: 'First work day of the week' },
      { name: 'Tuesday', emoji: '📗', description: 'Second day of the week' },
      { name: 'Wednesday', emoji: '📙', description: 'Middle of the week' },
      { name: 'Thursday', emoji: '📕', description: 'Almost weekend!' },
      { name: 'Friday', emoji: '📔', description: 'Last work day' },
      { name: 'Saturday', emoji: '🎮', description: 'Weekend fun day!' },
      { name: 'Sunday', emoji: '🏖️', description: 'Rest and relax day' }
    ]
  },
  
  'months': {
    id: 'months',
    title: 'Months of the Year',
    icon: '📆',
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9)',
    items: [
      { name: 'January', emoji: '❄️', description: 'First month, winter time' },
      { name: 'February', emoji: '💝', description: 'Valentine month, 28 days' },
      { name: 'March', emoji: '🌸', description: 'Spring begins' },
      { name: 'April', emoji: '🌧️', description: 'April showers bring flowers' },
      { name: 'May', emoji: '🌷', description: 'Flowers everywhere' },
      { name: 'June', emoji: '☀️', description: 'Summer starts' },
      { name: 'July', emoji: '🎆', description: 'Hot summer month' },
      { name: 'August', emoji: '🏖️', description: 'Beach time!' },
      { name: 'September', emoji: '🍂', description: 'Fall begins, back to school' },
      { name: 'October', emoji: '🎃', description: 'Halloween month' },
      { name: 'November', emoji: '🦃', description: 'Thanksgiving time' },
      { name: 'December', emoji: '🎄', description: 'Christmas month' }
    ]
  },
  
  'seasons': {
    id: 'seasons',
    title: 'Four Seasons',
    icon: '🌤️',
    color: 'linear-gradient(135deg, #fbbf24, #10b981, #ef4444, #3b82f6)',
    items: [
      { name: 'Spring', emoji: '🌸', description: 'Flowers bloom, warm weather' },
      { name: 'Summer', emoji: '☀️', description: 'Hot and sunny, beach time' },
      { name: 'Autumn', emoji: '🍂', description: 'Leaves fall, cooler weather' },
      { name: 'Winter', emoji: '⛄', description: 'Cold and snowy' }
    ]
  },
  
  'time-of-day': {
    id: 'time-of-day',
    title: 'Time of Day',
    icon: '🕐',
    color: 'linear-gradient(135deg, #fb923c, #f97316, #ea580c)',
    items: [
      { name: 'Morning', emoji: '🌅', description: 'Wake up time, sunrise' },
      { name: 'Afternoon', emoji: '☀️', description: 'After lunch, sunny' },
      { name: 'Evening', emoji: '🌆', description: 'Sunset time' },
      { name: 'Night', emoji: '🌙', description: 'Sleep time, moon is out' },
      { name: 'Midnight', emoji: '🌃', description: 'Middle of the night' },
      { name: 'Dawn', emoji: '🌄', description: 'Very early morning' },
      { name: 'Dusk', emoji: '🌇', description: 'Just before night' },
      { name: 'Noon', emoji: '🕛', description: '12 o clock daytime' }
    ]
  },

  'planets': {
    id: 'planets',
    title: 'Planets',
    icon: '🪐',
    color: 'linear-gradient(135deg, #1e3a8a, #312e81, #4c1d95)',
    items: [
      { name: 'Mercury', emoji: '☿️', description: 'Closest to the Sun' },
      { name: 'Venus', emoji: '♀️', description: 'Hottest planet' },
      { name: 'Earth', emoji: '🌍', description: 'Our home planet' },
      { name: 'Mars', emoji: '♂️', description: 'The red planet' },
      { name: 'Jupiter', emoji: '🪐', description: 'Largest planet' },
      { name: 'Saturn', emoji: '🪐', description: 'Has beautiful rings' },
      { name: 'Uranus', emoji: '🔵', description: 'Tilted on its side' },
      { name: 'Neptune', emoji: '🔷', description: 'Farthest from Sun' }
    ]
  },

  'ocean-animals': {
    id: 'ocean-animals',
    title: 'Ocean Animals',
    icon: '🐠',
    color: 'linear-gradient(135deg, #06b6d4, #0e7490, #155e75)',
    items: [
      { name: 'Fish', emoji: '🐠', description: 'Swims in water' },
      { name: 'Shark', emoji: '🦈', description: 'Big teeth, strong swimmer' },
      { name: 'Whale', emoji: '🐋', description: 'Largest animal on Earth' },
      { name: 'Dolphin', emoji: '🐬', description: 'Very smart and friendly' },
      { name: 'Octopus', emoji: '🐙', description: 'Has eight arms' },
      { name: 'Crab', emoji: '🦀', description: 'Walks sideways' },
      { name: 'Jellyfish', emoji: '🪼', description: 'Glows in the dark' },
      { name: 'Seahorse', emoji: '🐴', description: 'Horse-shaped fish' },
      { name: 'Starfish', emoji: '⭐', description: 'Star-shaped sea creature' },
      { name: 'Turtle', emoji: '🐢', description: 'Has a hard shell' }
    ]
  },

  'insects': {
    id: 'insects',
    title: 'Insects',
    icon: '🐝',
    color: 'linear-gradient(135deg, #facc15, #eab308, #ca8a04)',
    items: [
      { name: 'Bee', emoji: '🐝', description: 'Makes honey' },
      { name: 'Butterfly', emoji: '🦋', description: 'Beautiful wings' },
      { name: 'Ladybug', emoji: '🐞', description: 'Red with black spots' },
      { name: 'Ant', emoji: '🐜', description: 'Very strong for its size' },
      { name: 'Spider', emoji: '🕷️', description: 'Makes webs' },
      { name: 'Dragonfly', emoji: '🪰', description: 'Fast flyer' },
      { name: 'Grasshopper', emoji: '🦗', description: 'Jumps very high' },
      { name: 'Caterpillar', emoji: '🐛', description: 'Becomes a butterfly' },
      { name: 'Mosquito', emoji: '🦟', description: 'Tiny flying insect' },
      { name: 'Firefly', emoji: '✨', description: 'Glows at night' }
    ]
  },

  'birds': {
    id: 'birds',
    title: 'Birds',
    icon: '🐦',
    color: 'linear-gradient(135deg, #14b8a6, #0d9488, #0f766e)',
    items: [
      { name: 'Parrot', emoji: '🦜', description: 'Colorful, can talk' },
      { name: 'Eagle', emoji: '🦅', description: 'Strong and fierce' },
      { name: 'Owl', emoji: '🦉', description: 'Wise, hunts at night' },
      { name: 'Duck', emoji: '🦆', description: 'Swims in water' },
      { name: 'Penguin', emoji: '🐧', description: 'Cannot fly' },
      { name: 'Flamingo', emoji: '🦩', description: 'Pink and tall' },
      { name: 'Peacock', emoji: '🦚', description: 'Beautiful tail feathers' },
      { name: 'Swan', emoji: '🦢', description: 'Elegant white bird' },
      { name: 'Chicken', emoji: '🐔', description: 'Lays eggs' },
      { name: 'Turkey', emoji: '🦃', description: 'Thanksgiving bird' }
    ]
  },

  'musical-instruments': {
    id: 'musical-instruments',
    title: 'Musical Instruments',
    icon: '🎸',
    color: 'linear-gradient(135deg, #f43f5e, #e11d48, #be123c)',
    items: [
      { name: 'Piano', emoji: '🎹', description: 'Black and white keys' },
      { name: 'Guitar', emoji: '🎸', description: 'Six strings' },
      { name: 'Drums', emoji: '🥁', description: 'Hit with sticks' },
      { name: 'Violin', emoji: '🎻', description: 'Played with a bow' },
      { name: 'Trumpet', emoji: '🎺', description: 'Brass instrument' },
      { name: 'Flute', emoji: '🪈', description: 'Long and thin' },
      { name: 'Saxophone', emoji: '🎷', description: 'Jazz instrument' },
      { name: 'Microphone', emoji: '🎤', description: 'For singing' },
      { name: 'Accordion', emoji: '🪗', description: 'Squeeze to play' },
      { name: 'Xylophone', emoji: '🎵', description: 'Colorful bars' }
    ]
  },

  'emotions': {
    id: 'emotions',
    title: 'Emotions & Feelings',
    icon: '😊',
    color: 'linear-gradient(135deg, #fb923c, #f97316, #ea580c)',
    items: [
      { name: 'Happy', emoji: '😊', description: 'Feeling joyful and good' },
      { name: 'Sad', emoji: '😢', description: 'Feeling down or crying' },
      { name: 'Angry', emoji: '😠', description: 'Feeling mad or upset' },
      { name: 'Excited', emoji: '🤩', description: 'Very happy and energetic' },
      { name: 'Scared', emoji: '😨', description: 'Feeling afraid' },
      { name: 'Surprised', emoji: '😲', description: 'Did not expect it' },
      { name: 'Tired', emoji: '😴', description: 'Need to sleep' },
      { name: 'Love', emoji: '🥰', description: 'Caring about someone' },
      { name: 'Confused', emoji: '😕', description: 'Do not understand' },
      { name: 'Proud', emoji: '😌', description: 'Feeling accomplished' }
    ]
  },

  'occupations': {
    id: 'occupations',
    title: 'Jobs & Occupations',
    icon: '👨‍⚕️',
    color: 'linear-gradient(135deg, #0891b2, #0e7490, #155e75)',
    items: [
      { name: 'Doctor', emoji: '👨‍⚕️', description: 'Helps sick people' },
      { name: 'Teacher', emoji: '👨‍🏫', description: 'Teaches students' },
      { name: 'Firefighter', emoji: '👨‍🚒', description: 'Puts out fires' },
      { name: 'Police Officer', emoji: '👮', description: 'Keeps us safe' },
      { name: 'Chef', emoji: '👨‍🍳', description: 'Cooks delicious food' },
      { name: 'Pilot', emoji: '👨‍✈️', description: 'Flies airplanes' },
      { name: 'Farmer', emoji: '👨‍🌾', description: 'Grows our food' },
      { name: 'Artist', emoji: '👨‍🎨', description: 'Creates beautiful art' },
      { name: 'Scientist', emoji: '👨‍🔬', description: 'Discovers new things' },
      { name: 'Astronaut', emoji: '👨‍🚀', description: 'Goes to space' }
    ]
  },

  'family-members': {
    id: 'family-members',
    title: 'Family Members',
    icon: '👨‍👩‍👧‍👦',
    color: 'linear-gradient(135deg, #ec4899, #db2777, #be185d)',
    items: [
      { name: 'Mother', emoji: '👩', description: 'Mommy, takes care of you' },
      { name: 'Father', emoji: '👨', description: 'Daddy, protects family' },
      { name: 'Sister', emoji: '👧', description: 'Your female sibling' },
      { name: 'Brother', emoji: '👦', description: 'Your male sibling' },
      { name: 'Grandmother', emoji: '👵', description: 'Grandma, mom\'s mom' },
      { name: 'Grandfather', emoji: '👴', description: 'Grandpa, dad\'s dad' },
      { name: 'Baby', emoji: '👶', description: 'Youngest family member' },
      { name: 'Aunt', emoji: '👩', description: 'Parent\'s sister' },
      { name: 'Uncle', emoji: '👨', description: 'Parent\'s brother' },
      { name: 'Cousin', emoji: '👧', description: 'Aunt or uncle\'s child' }
    ]
  },

  'community-helpers': {
    id: 'community-helpers',
    title: 'Community Helpers',
    icon: '🏘️',
    color: 'linear-gradient(135deg, #10b981, #059669, #047857)',
    items: [
      { name: 'Mail Carrier', emoji: '📬', description: 'Delivers letters' },
      { name: 'Librarian', emoji: '📚', description: 'Helps find books' },
      { name: 'Dentist', emoji: '🦷', description: 'Takes care of teeth' },
      { name: 'Veterinarian', emoji: '🐾', description: 'Doctor for animals' },
      { name: 'Bus Driver', emoji: '🚌', description: 'Drives the bus' },
      { name: 'Garbage Collector', emoji: '🗑️', description: 'Keeps city clean' },
      { name: 'Construction Worker', emoji: '👷', description: 'Builds buildings' },
      { name: 'Nurse', emoji: '👩‍⚕️', description: 'Helps doctors' },
      { name: 'Store Clerk', emoji: '🛒', description: 'Works at store' },
      { name: 'Crossing Guard', emoji: '🛑', description: 'Helps kids cross street' }
    ]
  },

  'school-supplies': {
    id: 'school-supplies',
    title: 'School Supplies',
    icon: '✏️',
    color: 'linear-gradient(135deg, #eab308, #ca8a04, #a16207)',
    items: [
      { name: 'Pencil', emoji: '✏️', description: 'For writing and drawing' },
      { name: 'Pen', emoji: '🖊️', description: 'Writes in ink' },
      { name: 'Book', emoji: '📖', description: 'For reading' },
      { name: 'Backpack', emoji: '🎒', description: 'Carries school things' },
      { name: 'Ruler', emoji: '📏', description: 'Measures things' },
      { name: 'Scissors', emoji: '✂️', description: 'For cutting paper' },
      { name: 'Glue', emoji: '🖇️', description: 'Sticks things together' },
      { name: 'Crayon', emoji: '🖍️', description: 'For coloring' },
      { name: 'Calculator', emoji: '🔢', description: 'For math' },
      { name: 'Notebook', emoji: '📓', description: 'For taking notes' }
    ]
  },

  'room-items': {
    id: 'room-items',
    title: 'Things in a Room',
    icon: '🛋️',
    color: 'linear-gradient(135deg, #a855f7, #9333ea, #7e22ce)',
    items: [
      { name: 'Bed', emoji: '🛏️', description: 'Where you sleep' },
      { name: 'Chair', emoji: '🪑', description: 'For sitting' },
      { name: 'Table', emoji: '🪵', description: 'For eating or working' },
      { name: 'Lamp', emoji: '💡', description: 'Gives light' },
      { name: 'Window', emoji: '🪟', description: 'Lets in sunlight' },
      { name: 'Door', emoji: '🚪', description: 'Enter and exit' },
      { name: 'Clock', emoji: '🕐', description: 'Tells time' },
      { name: 'Mirror', emoji: '🪞', description: 'See your reflection' },
      { name: 'Toy Box', emoji: '🧸', description: 'Stores toys' },
      { name: 'Bookshelf', emoji: '📚', description: 'Holds books' }
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
