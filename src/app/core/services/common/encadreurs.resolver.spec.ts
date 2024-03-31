import { TestBed } from '@angular/core/testing';

import { EncadreursResolver } from './encadreurs.resolver';

describe('EncadreursResolver', () => {
  let resolver: EncadreursResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EncadreursResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
