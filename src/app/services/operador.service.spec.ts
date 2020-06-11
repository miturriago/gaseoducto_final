import { TestBed } from '@angular/core/testing';

import { OperadorService } from './operador.service';

describe('OperadorService', () => {
  let service: OperadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
