import { TestBed } from '@angular/core/testing';

import { CodePlatformService } from './code-platform.service';

describe('CodePlatformService', () => {
  let service: CodePlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
