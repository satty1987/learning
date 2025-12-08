import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NumberTapComponent } from './number-tap.component';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('NumberTapComponent', () => {
  let component: NumberTapComponent;
  let fixture: ComponentFixture<NumberTapComponent>;
  let mockRouter: any;
  let mockSpeech: any;
  let mockMeta: any;

  beforeEach(async () => {
    mockRouter = { lastNav: null, navigate: (args: any) => { mockRouter.lastNav = args; } };
    mockSpeech = { last: '', speak: (t: string) => { mockSpeech.last = t; } };
    mockMeta = { injectMetaTags: (_: any, __: any) => {} };

    await TestBed.configureTestingModule({
      imports: [NumberTapComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SpeechService, useValue: mockSpeech },
        { provide: MetaTagsService, useValue: mockMeta }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goBack should navigate to /home', () => {
    component.goBack();
    expect(mockRouter.lastNav).toEqual(['/home']);
  });

  it('onNumberTap should set activeNumber, call speech and clear after timeout', async () => {
    component.onNumberTap(5 as any);
    expect(component.activeNumber).toBe(5 as any);
    expect(mockSpeech.last).toBe('5');

    // after 500ms activeNumber should be cleared
    await new Promise((res) => setTimeout(res, 600));
    expect(component.activeNumber).toBeNull();
  });

  it('isActive returns correct boolean for active number', () => {
    component.activeNumber = 3 as any;
    expect(component.isActive(3)).toBeTruthy();
    expect(component.isActive(4)).toBeFalsy();
  });
});
