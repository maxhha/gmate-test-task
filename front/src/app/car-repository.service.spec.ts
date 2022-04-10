import { TestBed } from '@angular/core/testing';

import { CarRepositoryService } from './car-repository.service';

describe('CarRepositoryService', () => {
  let service: CarRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
