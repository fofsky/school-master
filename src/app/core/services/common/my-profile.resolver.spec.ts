import { TestBed } from '@angular/core/testing';

import { MyProfileResolver } from './my-profile.resolver';

describe('MyProfileResolver', () => {
  let resolver: MyProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
