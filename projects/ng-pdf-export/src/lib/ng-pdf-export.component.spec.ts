import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPdfExportComponent } from './ng-pdf-export.component';

describe('NgPdfExportComponent', () => {
  let component: NgPdfExportComponent;
  let fixture: ComponentFixture<NgPdfExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPdfExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPdfExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
