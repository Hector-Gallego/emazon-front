import { TestBed } from '@angular/core/testing';

import { TableToolBarService } from './table-tool-bar.service';

describe('TableToolBarService', () => {
  let service: TableToolBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableToolBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
