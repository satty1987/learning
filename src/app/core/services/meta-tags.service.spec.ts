import { TestBed } from '@angular/core/testing';
import { MetaTagsService } from './meta-tags.service';
import { Meta, Title } from '@angular/platform-browser';
import { StructuredDataService } from './structured-data.service';

describe('MetaTagsService', () => {
  let service: MetaTagsService;
  let mockMeta: any;
  let mockTitle: any;
  let mockStructured: any;

  beforeEach(() => {
    mockMeta = {
      updated: [] as any[],
      removed: [] as string[],
      updateTag(obj: any) { this.updated.push(obj); },
      removeTag(sel: string) { this.removed.push(sel); }
    };

    mockTitle = { lastTitle: '', setTitle(t: string) { this.lastTitle = t; } };

    mockStructured = { inserted: null as any, insertSchema(schema: any) { this.inserted = schema; } };

    TestBed.configureTestingModule({
      providers: [
        { provide: Meta, useValue: mockMeta },
        { provide: Title, useValue: mockTitle },
        { provide: StructuredDataService, useValue: mockStructured }
      ]
    });

    service = TestBed.inject(MetaTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update meta tags and title', () => {
    const cfg = {
      title: 'My Title',
      description: 'My Desc',
      keywords: 'a,b,c',
      image: 'https://img',
      url: 'https://url',
      type: 'website'
    } as any;

    service.updateMetaTags(cfg);

    expect(mockTitle.lastTitle).toBe('My Title');
    // description, keywords and several og/twitter tags should be present
    const names = mockMeta.updated.map((u: any) => Object.keys(u)[0] === 'name' ? `name:${u.name}` : `prop:${u.property}`);
    expect(names.some((n: string) => n.includes('name:description'))).toBeTruthy();
    expect(names.some((n: string) => n.includes('prop:og:title'))).toBeTruthy();
    expect(names.some((n: string) => n.includes('name:twitter:card'))).toBeTruthy();
  });

  it('should remove meta tags', () => {
    service.removeMetaTags();
    expect(mockMeta.removed).toContain('name="description"');
    expect(mockMeta.removed).toContain('property="og:title"');
  });

  it('should inject meta tags and structured data', () => {
    const cfg = { title: 'X' } as any;
    const schema = { '@type': 'WebApplication' } as any;
    service.injectMetaTags(cfg, schema);
    expect(mockStructured.inserted).toEqual(schema);
  });
});
