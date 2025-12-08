import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnimalsComponent } from './animals.component';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('AnimalsComponent', () => {
  let component: AnimalsComponent;
  let fixture: ComponentFixture<AnimalsComponent>;
  let mockRouter: any;
  let mockSpeech: any;
  let mockScore: any;
  let mockMeta: any;

  beforeEach(async () => {
    // simple plain-js mocks (avoid jasmine globals so tests run under different runners)
    mockRouter = { lastNav: null, navigate: (args: any) => { mockRouter.lastNav = args; } };
    mockSpeech = { last: '', speak: (t: string) => { mockSpeech.last = t; } };
    mockScore = { _score: 0, getScore: (_key: string) => mockScore._score, incrementScore: (_key: string) => { mockScore._score++; } };
    mockMeta = { injectMetaTags: (_: any, __: any) => {} };

    await TestBed.configureTestingModule({
      imports: [AnimalsComponent],
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
    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize score from ScoreService on init', () => {
    mockScore._score = 7;
    // recreate component to pick up new mock score value
    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.score).toBe(7);
  });

  it('previous and next should respect bounds', () => {
    component.currentIndex = 0;
    component.previous();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = component.animals.length - 1;
    component.next();
    expect(component.currentIndex).toBe(component.animals.length - 1);

    component.currentIndex = 3;
    component.next();
    expect(component.currentIndex).toBe(4);
    component.previous();
    expect(component.currentIndex).toBe(3);
  });

  it('goBack should navigate to /home', () => {
    component.goBack();
    expect(mockRouter.lastNav).toEqual(['/home']);
  });

  it('sayAnimal should speak and increment score and show celebration then hide it', async () => {
    mockScore._score = 0;
    component.currentIndex = 0;

    component.sayAnimal();

    // immediate effects
    expect(mockSpeech.last).toContain(component.currentAnimal.name);
    expect(mockScore._score).toBe(1);
    expect(component.showCelebration).toBeTruthy();

    // after celebrate timeout it should hide the celebration
    await new Promise((res) => setTimeout(res, 2100));
    expect(component.showCelebration).toBeFalsy();
  });
});
