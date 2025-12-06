import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nav-buttons">
      <button class="nav-btn" 
              [disabled]="!canGoPrevious"
              (click)="previous.emit()">
        ← Previous
      </button>
      <button class="nav-btn next" 
              [disabled]="!canGoNext"
              (click)="next.emit()">
        Next →
      </button>
    </div>
  `,
  styles: [`
    .nav-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: clamp(15px, 4vw, 30px);
      margin-top: 30px;
      padding: 0 20px;
    }

    .nav-btn {
      background: #fbbf24;
      color: white;
      font-size: clamp(1rem, 3vw, 1.5rem);
      font-weight: bold;
      padding: clamp(12px, 3vw, 20px) clamp(25px, 5vw, 40px);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      transition: transform 0.3s;
    }

    .nav-btn:hover:not(:disabled) {
      transform: scale(1.1);
    }

    .nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .nav-btn.next {
      background: #10b981;
    }
  `]
})
export class NavigationComponent {
  @Input() canGoPrevious = true;
  @Input() canGoNext = true;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
