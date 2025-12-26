import { TestBed } from '@angular/core/testing';
import { ScoreService, Scores } from './score.service';

describe('ScoreService', () => {
	let service: ScoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScoreService]
		});
		service = TestBed.inject(ScoreService);
	});

	it('should be created and have all scores zero initially', () => {
		expect(service).toBeTruthy();
		const expected: Scores = {
			abc: 0,
			numbers: 0,
			colors: 0,
			shapes: 0,
			animals: 0,
			quiz: 0,
			opposites: 0,
			rhymes: 0,
			addition: 0,
			evenOdd: 0
		};
		let latest: Scores | undefined;
		service.scores$.subscribe(v => (latest = v));
		expect(latest).toEqual(expected);
		expect(service.getScore('abc')).toBe(0);
		expect(service.getScore('numbers')).toBe(0);
	});

	it('incrementScore should increase the specified category', () => {
		expect(service.getScore('colors')).toBe(0);
		service.incrementScore('colors');
		expect(service.getScore('colors')).toBe(1);
	});

	it('resetScore should set the category back to zero', () => {
		service.incrementScore('shapes');
		expect(service.getScore('shapes')).toBe(1);
		service.resetScore('shapes');
		expect(service.getScore('shapes')).toBe(0);
	});

	it('scores$ observable should emit updates when scores change', () => {
		const emissions: Scores[] = [];
		const sub = service.scores$.subscribe(v => emissions.push(v));
		service.incrementScore('abc');
		service.incrementScore('numbers');
		expect(emissions.length).toBeGreaterThanOrEqual(3);
		expect(emissions[0].abc).toBe(0);
		expect(emissions[1].abc).toBe(1);
		expect(emissions[2].numbers).toBe(1);
		sub.unsubscribe();
	});
});
