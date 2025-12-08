import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbcTapComponent } from './abc-tap.component';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('AbcTapComponent', () => {
  let component: AbcTapComponent;
  let fixture: ComponentFixture<AbcTapComponent>;

  let mockRouter: any;
  let mockSpeech: any;
  let mockMeta: any;

  beforeEach(async () => {
    mockRouter = { lastNav: null, navigate: (args: any) => { mockRouter.lastNav = args; } };
    mockSpeech = { last: '', speak: (t: string) => { mockSpeech.last = t; } };
    mockMeta = { injectMetaTags: (_: any, __: any) => {} };

    await TestBed.configureTestingModule({
      imports: [AbcTapComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SpeechService, useValue: mockSpeech },
        { provide: MetaTagsService, useValue: mockMeta }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AbcTapComponent);
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

  it('onLetterTap should set activeLetter, call speech and clear after timeout', async () => {
    const item = component.alphabet[0];
    mockSpeech.last = '';

    component.onLetterTap(item);

    // immediate effects
    expect(component.activeLetter).toBe(item.letter);
    expect(mockSpeech.last).toBe(`${item.letter}. ${item.word}`);

    // activeLetter should clear after ~500ms
    await new Promise((res) => setTimeout(res, 600));
    expect(component.activeLetter).toBeNull();
  });
});
