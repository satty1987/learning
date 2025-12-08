import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable buttons based on inputs', () => {
    component.canGoPrevious = false;
    component.canGoNext = false;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    const prevBtn = buttons[0].nativeElement as HTMLButtonElement;
    const nextBtn = buttons[1].nativeElement as HTMLButtonElement;

    expect(prevBtn.disabled).toBeTruthy();
    expect(nextBtn.disabled).toBeTruthy();
  });

  it('should emit previous and next when buttons clicked', () => {
    fixture.detectChanges();

    let prevCalled = false;
    let nextCalled = false;
    component.previous.subscribe(() => (prevCalled = true));
    component.next.subscribe(() => (nextCalled = true));

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const prevBtn = buttons[0].nativeElement as HTMLButtonElement;
    const nextBtn = buttons[1].nativeElement as HTMLButtonElement;

    prevBtn.click();
    nextBtn.click();

    expect(prevCalled).toBeTruthy();
    expect(nextCalled).toBeTruthy();
  });
});
