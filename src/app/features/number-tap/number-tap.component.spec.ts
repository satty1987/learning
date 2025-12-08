import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NumberTapComponent } from './number-tap.component';

describe('NumberTapComponent', () => {
  let component: NumberTapComponent;
  let fixture: ComponentFixture<NumberTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTapComponent],
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
});
