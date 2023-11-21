import { TestBed } from '@angular/core/testing';

import { StapiDataService } from './stapi-data.service';

describe('StapiDataService', () => {
  let service: StapiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StapiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
