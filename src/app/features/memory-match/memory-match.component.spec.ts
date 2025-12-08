import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MemoryMatchComponent } from './memory-match.component';

describe('MemoryMatchComponent', () => {
  let component: MemoryMatchComponent;
  let fixture: ComponentFixture<MemoryMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryMatchComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
