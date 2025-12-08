declare const jasmine: any;
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryLearningComponent } from './category-learning.component';
import { SpeechService } from '../../core/services/speech.service';
import { ScoreService } from '../../core/services/score.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';

describe('CategoryLearningComponent', () => {
	let component: CategoryLearningComponent;
	let fixture: ComponentFixture<CategoryLearningComponent>;
	let mockRouter: any;
	let mockActivatedRoute: any;
	let mockSpeechService: any;
	let mockScoreService: any;
	let mockMetaService: any;

	beforeEach(async () => {
		mockRouter = { calls: [] as any[], navigate: (args: any) => { mockRouter.calls.push(args); } };
		mockActivatedRoute = { params: of({ category: 'animals' }) };
		mockSpeechService = { lastSpoken: '', speak: (text: string) => { mockSpeechService.lastSpoken = text; } };
		mockScoreService = { getScore: (_id?: any) => 5, incrementScore: (id: any) => { mockScoreService.incremented = id; } } as any;
		mockMetaService = { injectMetaTags: (_meta: any, _schema: any) => {} };

		await TestBed.configureTestingModule({
			imports: [CategoryLearningComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: SpeechService, useValue: mockSpeechService },
				{ provide: ScoreService, useValue: mockScoreService },
				{ provide: MetaTagsService, useValue: mockMetaService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(CategoryLearningComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set category from route params', () => {
		expect(component.categoryId).toBe('animals');
		expect(component.category).toBeTruthy();
		expect(component.category?.id).toBe('animals');
	});

	it('should navigate back on goBack', () => {
		component.goBack();
		expect(mockRouter.calls.length).toBeGreaterThan(0);
		expect(mockRouter.calls[0]).toEqual(['/home']);
	});

	it('should move next and previous correctly', () => {
		component.currentIndex = 0;
		expect(component.canGoPrevious).toBeFalsy();
		component.next();
		expect(component.currentIndex).toBe(1);

		component.currentIndex = component.category!.items.length - 1;
		expect(component.canGoNext).toBeFalsy();
		component.previous();
		expect(component.currentIndex).toBe(component.category!.items.length - 2);
	});

	it('should speak item and celebrate', async () => {
		component.currentIndex = 0;
		const current = component.currentItem!;
		component.speakItem();

		expect((mockSpeechService as any).lastSpoken).toBe(`${current.name}. ${current.description}`);
		expect((mockScoreService as any).incremented).toBe('animals');
		expect(component.showCelebration).toBeTruthy();
		await new Promise((res) => setTimeout(res, 2100));
		expect(component.showCelebration).toBeFalsy();
	});
});

