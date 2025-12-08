import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { CanonicalService } from './core/services/canonical.service';

class MockCanonical {
  lastUrl: string | null = null;
  setCanonicalURL(u: string) {
    this.lastUrl = u;
  }
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should call canonical.setCanonicalURL on NavigationEnd using base href', () => {
    const events$ = new Subject<any>();
    const mockRouter: any = { events: events$.asObservable(), url: '/memory-match' };
    // attach a real <base> element to the document head so Angular's
    // test renderer can operate normally
    const baseEl = document.createElement('base');
    baseEl.href = 'https://example.test/app/';
    document.head.appendChild(baseEl);
    const mockCanonical = new MockCanonical();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CanonicalService, useValue: mockCanonical }
      ] as any
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    // emit NavigationEnd
    events$.next(new NavigationEnd(1, '/memory-match', '/memory-match'));

    // canonical should be set using base href + router.url
    expect(mockCanonical.lastUrl).toBe(new URL(mockRouter.url, baseEl.href).toString());

    // cleanup base element
    document.head.removeChild(baseEl);
  });

  it('should call canonical.setCanonicalURL on NavigationEnd when no base href', () => {
    const events$ = new Subject<any>();
    const mockRouter: any = { events: events$.asObservable(), url: '/home' };
    // ensure there is no base element present
    const existingBase = document.head.querySelector('base');
    if (existingBase) document.head.removeChild(existingBase);
    const mockCanonical = new MockCanonical();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CanonicalService, useValue: mockCanonical }
      ] as any
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    events$.next(new NavigationEnd(1, '/home', '/home'));

    // when no base tag, code falls back to location.origin + '/'
    const expected = new URL(mockRouter.url, `${location.origin}/`).toString();
    expect(mockCanonical.lastUrl).toBe(expected);
  });
});
