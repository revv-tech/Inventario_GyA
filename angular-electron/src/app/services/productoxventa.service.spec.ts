import { TestBed } from '@angular/core/testing';

import { ProductoxventaService } from './productoxventa.service';

describe('ProductoxventaService', () => {
  let service: ProductoxventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoxventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
