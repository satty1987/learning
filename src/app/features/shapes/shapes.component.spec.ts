import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ShapesComponent } from './shapes.component';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('ShapesComponent', () => {
  let component: ShapesComponent;
  let fixture: ComponentFixture<ShapesComponent>;
  let mockRouter: any;
  let mockSpeech: any;
  let mockScore: any;
  let mockMeta: any;

  beforeEach(async () => {
    mockRouter = { lastNav: null, navigate: (args: any) => { mockRouter.lastNav = args; } };
    mockSpeech = { last: '', speak: (t: string) => { mockSpeech.last = t; } };
    mockScore = { _score: 0, getScore: (_key: string) => mockScore._score, incrementScore: (_key: string) => { mockScore._score++; } };
    mockMeta = { injectMetaTags: (_: any, __: any) => {} };

    await TestBed.configureTestingModule({
      imports: [ShapesComponent],
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
    fixture = TestBed.createComponent(ShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigation bounds work for previous/next', () => {
    component.currentIndex = 0;
    component.previous();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = component.shapes.length - 1;
    component.next();
    expect(component.currentIndex).toBe(component.shapes.length - 1);

    component.currentIndex = 4;
    component.next();
    expect(component.currentIndex).toBe(5);
    component.previous();
    expect(component.currentIndex).toBe(4);
  });

  it('goBack navigates to /home', () => {
    component.goBack();
    expect(mockRouter.lastNav).toEqual(['/home']);
  });

  it('sayShape speaks and increments score and toggles celebration', async () => {
    mockScore._score = 0;
    component.currentIndex = 0;
    component.sayShape();

    expect(mockSpeech.last).toBe('Circle');
    expect(mockScore._score).toBe(1);
    expect(component.showCelebration).toBeTruthy();

    await new Promise((res) => setTimeout(res, 2100));
    expect(component.showCelebration).toBeFalsy();
  });
});
