import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbcComponent } from './abc.component';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { Router } from '@angular/router';

describe('AbcComponent', () => {
  let component: AbcComponent;
  let fixture: ComponentFixture<AbcComponent>;
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
      imports: [AbcComponent],
      providers: [
        { provide: SpeechService, useValue: speechSpy },
        { provide: ScoreService, useValue: scoreSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcComponent);
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

  it('should not go previous at index 0 and not go next at last index', () => {
    const lastIndex = component.alphabet.length - 1;
    component.currentIndex = 0;
    component.previous();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = lastIndex;
    component.next();
    expect(component.currentIndex).toBe(lastIndex);
  });

  it('should move next and previous when allowed', () => {
    component.currentIndex = 1;
    component.previous();
    expect(component.currentIndex).toBe(0);
    component.next();
    expect(component.currentIndex).toBe(1);
  });

  it('should speak and celebrate on sayLetter', () => {
    // replace setTimeout so the callback runs immediately in this test environment
    const orig = window.setTimeout;
    (window as any).setTimeout = (fn: any) => { fn(); return 0 as any; };

    component.currentIndex = 0;
    component.sayLetter();

    expect(speechSpy._last).toBe(`${component.currentItem.letter}. ${component.currentItem.word}`);
    expect(scoreSpy._lastInc).toBe('abc');

    // restore
    (window as any).setTimeout = orig;
  });
});
