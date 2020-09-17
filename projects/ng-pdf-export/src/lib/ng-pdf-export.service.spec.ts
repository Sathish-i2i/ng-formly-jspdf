import { TestBed } from '@angular/core/testing';

import { NgPdfExportService } from './ng-pdf-export.service';

describe('NgPdfExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgPdfExportService = TestBed.get(NgPdfExportService);
    expect(service).toBeTruthy();
  });
});
