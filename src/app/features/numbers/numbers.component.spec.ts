import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NumbersComponent } from './numbers.component';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { Router } from '@angular/router';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;
  let speechSpy: any;
  let scoreSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    speechSpy = { _last: '', speak: (text: string) => { speechSpy._last = text; } };
    scoreSpy = {
      _lastInc: null,
      incrementScore: (cat: any) => { scoreSpy._lastInc = cat; },
      getScore: (_cat: any) => 0
    };
    routerSpy = { _navArgs: null, navigate: (args: any) => { routerSpy._navArgs = args; } };

    await TestBed.configureTestingModule({
      imports: [NumbersComponent],
      providers: [
        { provide: SpeechService, useValue: speechSpy },
        { provide: ScoreService, useValue: scoreSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect((TestBed.inject(Router) as any)._navArgs).toEqual(['/home']);
  });

  it('should return correct current number and emoji and dots', () => {
    component.currentIndex = 4; // number 5
    expect(component.currentNumber).toBe(5);
    expect(component.currentEmoji).toBe(component.numberEmojis[4]);
    expect(component.dots.length).toBe(5);
  });

  it('should use small dot class when >10', () => {
    component.currentIndex = 11; // 12
    expect(component.dotClass).toContain('dot-small');
  });

  it('should compute dot delay', () => {
    expect(component.getDotDelay(3)).toMatch(/0\.3/);
  });

  it('should speak and celebrate on sayNumber', () => {
    const orig = window.setTimeout;
    (window as any).setTimeout = (fn: any) => { fn(); return 0 as any; };

    component.currentIndex = 2; // 3
    component.sayNumber();
    expect(speechSpy._last).toBe('3');
    expect(scoreSpy._lastInc).toBe('numbers');

    (window as any).setTimeout = orig;
  });
});
