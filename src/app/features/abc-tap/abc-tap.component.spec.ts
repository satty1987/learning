import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbcTapComponent } from './abc-tap.component';

describe('AbcTapComponent', () => {
  let component: AbcTapComponent;
  let fixture: ComponentFixture<AbcTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcTapComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
