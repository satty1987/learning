import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { StructuredDataService } from './structured-data.service';

describe('StructuredDataService', () => {
  let service: StructuredDataService;
  let mockDoc: any;
  let appended: any[];

  beforeEach(() => {
    appended = [];
    mockDoc = {
      head: { appendChild: (el: any) => appended.push(el) },
      querySelector: (_sel: string) => null,
      querySelectorAll: (_sel: string) => [],
      createElement: (tag: string) => ({
        tagName: tag,
        classList: { add: (_: string) => {} },
        type: '',
        text: ''
      })
    };

    TestBed.configureTestingModule({ providers: [{ provide: DOCUMENT, useValue: mockDoc }] });
    service = TestBed.inject(StructuredDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert schema when none exists', () => {
    const schema = { '@type': 'Test' };
    service.insertSchema(schema);

    expect(appended.length).toBeGreaterThan(0);
    const scr = appended[0];
    expect(scr.type).toBe('application/ld+json');
    expect(scr.text).toBe(JSON.stringify(schema));
  });

  it('should update existing schema script if present', () => {
    const existing = { classList: { add: (_: string) => {} }, type: '', text: '' } as any;
    mockDoc.querySelector = (_: string) => existing;

    const schema = { a: 1 };
    service.insertSchema(schema);
    expect(existing.type).toBe('application/ld+json');
    expect(existing.text).toBe(JSON.stringify(schema));
  });

  it('should remove structured data scripts', () => {
    const removedFlags: boolean[] = [];
    const el1 = { remove: () => removedFlags.push(true) };
    const el2 = { remove: () => removedFlags.push(true) };
    mockDoc.querySelectorAll = (_: string) => [el1, el2];

    service.removeStructuredData();
    expect(removedFlags.length).toBe(2);
  });
});
