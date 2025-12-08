import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { SpeechService } from '../../core/services/speech.service';
import { Router } from '@angular/router';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let speechSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    speechSpy = { _last: '', speak: (text: string) => { speechSpy._last = text; } };
    routerSpy = { _navArgs: null, navigate: (args: any) => { routerSpy._navArgs = args; } };

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        { provide: SpeechService, useValue: speechSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save an answer and mark it saved', () => {
    const orig = window.setTimeout;
    (window as any).setTimeout = (fn: any) => { fn(); return 0 as any; };

    component.answers.name = 'John';
    component.saveAnswer('name');
    expect(component.isSaved('name')).toBeTruthy();

    (window as any).setTimeout = orig;
  });

  it('should show error when reviewing with zero answers', () => {
    const orig = window.setTimeout;
    (window as any).setTimeout = (fn: any) => { fn(); return 0 as any; };

    component.answers = { name: '', father: '', mother: '', age: '' };
    component.reviewAnswers();
    expect(component.messageType).toBe('error');

    (window as any).setTimeout = orig;
  });

  it('should show warning when reviewing with partial answers', () => {
    const orig = window.setTimeout;
    (window as any).setTimeout = (fn: any) => { fn(); return 0 as any; };

    component.answers.name = 'A';
    component.reviewAnswers();
    expect(component.messageType).toBe('warning');
    expect(component.message).toContain('answered 1 out of 4');

    (window as any).setTimeout = orig;
  });

  it('should speak and show success when all answers provided', () => {
    component.answers = { name: 'Sally', father: 'Bob', mother: 'Janet', age: '7' };
    component.reviewAnswers();
    expect(component.messageType).toBe('success');
    expect(component.message).toContain('Your name is Sally');
    expect(speechSpy._last).toContain('Sally');
  });
});
