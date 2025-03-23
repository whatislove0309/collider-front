import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { graphResolver } from './graph.resolver';

describe('graphResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => graphResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
