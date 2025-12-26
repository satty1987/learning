import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { EvenOddComponent } from './even-odd.component';

describe('EvenOddComponent', () => {
  let component: EvenOddComponent;
  let fixture: ComponentFixture<EvenOddComponent>;
  let mockRouter: any;
  let mockSpeech: any;
  let mockScore: any;
  let mockMeta: any;

  beforeEach(async () => {
    mockRouter = { lastNav: null, navigate: (args: any) => { mockRouter.lastNav = args; } };
    mockSpeech = { last: '', speak: (t: string) => { mockSpeech.last = t; } };
    mockScore = {
      value: 0,
      getScore: (_key: any) => mockScore.value,
      incrementScore: (_key: any) => { mockScore.value++; },
      resetScore: (_key: any) => { mockScore.value = 0; }
    };
    mockMeta = { injectMetaTags: (_: any, __: any) => {} };

    await TestBed.configureTestingModule({
      imports: [EvenOddComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SpeechService, useValue: mockSpeech },
        { provide: ScoreService, useValue: mockScore },
        { provide: MetaTagsService, useValue: mockMeta }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goBack should navigate home', () => {
    component.goBack();
    expect(mockRouter.lastNav).toEqual(['/home']);
  });

  it('answer should reward correct parity guesses', () => {
    component.currentIndex = 0; // value 2, even
    component.answer('even');
    expect(mockScore.value).toBe(1);
    expect(component.feedback).toContain('Great!');
    expect(component.showCelebration).toBeTrue();
  });

  it('answer should guide on incorrect guesses', () => {
    component.currentIndex = 1; // value 3, odd
    component.answer('even');
    expect(mockScore.value).toBe(0);
    expect(component.feedback).toContain('Almost');
    expect(component.showCelebration).toBeFalse();
  });

  it('speakCard should call speech service with hint', () => {
    component.speakCard();
    expect(mockSpeech.last).toContain('Is it even or odd');
  });
});
