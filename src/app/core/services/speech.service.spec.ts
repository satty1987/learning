import { TestBed } from '@angular/core/testing';
import { SpeechService } from './speech.service';


describe('SpeechService', () => {
	let service: SpeechService;
	let originalSpeechSynthesis: any;
	let originalUtterance: any;

	beforeEach(() => {
		originalSpeechSynthesis = (window as any).speechSynthesis;
		originalUtterance = (window as any).SpeechSynthesisUtterance;

		const speakSpy: any = (...args: any[]) => {
			(speakSpy as any).calls = (speakSpy as any).calls || [];
			(speakSpy as any).calls.push(args);
		};

		const cancelSpy: any = (...args: any[]) => {
			(cancelSpy as any).calls = (cancelSpy as any).calls || [];
			(cancelSpy as any).calls.push(args);
		};

		(window as any).speechSynthesis = {
			speak: speakSpy,
			cancel: cancelSpy
		};

		(window as any).SpeechSynthesisUtterance = function (this: any, text: string) {
			this.text = text;
			this.rate = 1;
			this.pitch = 1;
		} as any;

		TestBed.configureTestingModule({ providers: [SpeechService] });
		service = TestBed.inject(SpeechService);
	});

	afterEach(() => {
		(window as any).speechSynthesis = originalSpeechSynthesis;
		(window as any).SpeechSynthesisUtterance = originalUtterance;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('speak should call speechSynthesis.speak with correct utterance', () => {
		service.speak('hello world');
		const speakCalls = (window as any).speechSynthesis.speak.calls || [];
		expect(speakCalls.length).toBeGreaterThan(0);

		const lastArgs = speakCalls[speakCalls.length - 1];
		expect(lastArgs.length).toBe(1);
		const utterance = lastArgs[0];
		expect(utterance.text).toBe('hello world');
		expect(utterance.rate).toBe(0.8);
		expect(utterance.pitch).toBe(1.2);
	});

	it('cancel should call speechSynthesis.cancel', () => {
		service.cancel();
		const cancelCalls = (window as any).speechSynthesis.cancel.calls || [];
		expect(cancelCalls.length).toBeGreaterThan(0);
	});
});

