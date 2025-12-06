import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (isActive) {
    <div class="celebration" [class.active]="isActive">

     <!-- <div class="celebration-emoji">🎉</div> -->

      @for (star of stars; track star) {
      <div class="star" [style.left.%]="star.left" [style.animation-delay.s]="star.delay"> ⭐ </div>
  }

</div>
  }
  `,
  styles: [`
    .celebration {
      position: fixed;
      inset: 0;
      pointer-events: none;
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .celebration.active {
      display: flex;
    }
    
    .celebration-emoji {
      font-size: clamp(4rem, 15vw, 8rem);
      animation: ping 1s;
    }
    
    @keyframes ping {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .star {
      position: absolute;
      font-size: clamp(2rem, 6vw, 4rem);
      animation: floatStar 1.5s ease-out forwards;
    }
    
    @keyframes floatStar {
      0% { 
        transform: translateY(100vh);
        opacity: 1;
      }
      100% { 
        transform: translateY(-20vh);
        opacity: 0;
      }
    }
  `]
})
export class CelebrationComponent {
  @Input() isActive = false;
  stars: Array<{ left: number; delay: number }> = [];

  ngOnChanges(): void {
    if (this.isActive) {
      this.generateStars();
    }
  }

  private generateStars(): void {
    this.stars = Array.from({ length: 12 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
  }
}
