import { TestBed } from '@angular/core/testing';
import { CelebrationComponent } from './celebration.component';

describe('CelebrationComponent', () => {
  let component: CelebrationComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebrationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CelebrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not generate stars when inactive', () => {
    component.isActive = false;
    component.stars = [];
    component.ngOnChanges();
    expect(component.stars.length).toBe(0);
  });

  it('should generate 12 stars when activated', () => {
    component.isActive = true;
    component.stars = [];
    component.ngOnChanges();

    expect(component.stars.length).toBe(12);

    component.stars.forEach(star => {
      expect(typeof star.left).toBe('number');
      expect(star.left).toBeGreaterThanOrEqual(0);
      expect(star.left).toBeLessThanOrEqual(100);

      expect(typeof star.delay).toBe('number');
      expect(star.delay).toBeGreaterThanOrEqual(0);
      expect(star.delay).toBeLessThanOrEqual(0.5);
    });
  });

  it('should regenerate stars on subsequent activations', () => {
    component.isActive = true;
    component.ngOnChanges();
    const first = component.stars.slice();

    // Force regeneration
    component.isActive = true;
    component.ngOnChanges();
    const second = component.stars;

    // arrays should be different references
    expect(second).not.toBe(first);
    expect(second.length).toBe(12);
  });

  it('should render celebration element and stars when active', () => {
    component.isActive = true;
    component.ngOnChanges();
    fixture.detectChanges();

    const host = fixture.nativeElement;
    const celebrationEl = host.querySelector('.celebration');
    expect(celebrationEl).toBeTruthy();
    expect(celebrationEl.classList).toContain('active');

    const starEls = host.querySelectorAll('.star');
    expect(starEls.length).toBe(12);

    // check style attributes are present and parsable
    const styleLeft = starEls[0].style.left; // e.g. '34.2345%'
    expect(styleLeft).toMatch(/%$/);
    const leftValue = parseFloat(styleLeft.replace('%',''));
    expect(leftValue).toBeGreaterThanOrEqual(0);
    expect(leftValue).toBeLessThanOrEqual(100);

    const animDelay = starEls[0].style.animationDelay; // e.g. '0.12s'
    expect(animDelay).toMatch(/s$/);
    const delayValue = parseFloat(animDelay.replace('s',''));
    expect(delayValue).toBeGreaterThanOrEqual(0);
    expect(delayValue).toBeLessThanOrEqual(0.5);
  });
});
