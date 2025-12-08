import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ColorsComponent } from './colors.component';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('ColorsComponent', () => {
  let component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;
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
      imports: [ColorsComponent],
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
    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('previous and next enforce bounds', () => {
    component.currentIndex = 0;
    component.previous();
    expect(component.currentIndex).toBe(0);

    component.currentIndex = component.colors.length - 1;
    component.next();
    expect(component.currentIndex).toBe(component.colors.length - 1);

    component.currentIndex = 2;
    component.next();
    expect(component.currentIndex).toBe(3);
    component.previous();
    expect(component.currentIndex).toBe(2);
  });

  it('goBack navigates to /home', () => {
    component.goBack();
    expect(mockRouter.lastNav).toEqual(['/home']);
  });

  it('sayColor should speak the color name and increment score', async () => {
    mockScore._score = 0;
    component.currentIndex = 1;
    component.sayColor();

    expect(mockSpeech.last).toBe('Blue');
    expect(mockScore._score).toBe(1);
    expect(component.showCelebration).toBeTruthy();

    await new Promise((res) => setTimeout(res, 2100));
    expect(component.showCelebration).toBeFalsy();
  });
});
