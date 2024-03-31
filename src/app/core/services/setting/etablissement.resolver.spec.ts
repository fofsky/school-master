import { TestBed } from '@angular/core/testing';

import { EtablissementResolver } from './etablissement.resolver';

describe('EtablissementResolver', () => {
  let resolver: EtablissementResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EtablissementResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
