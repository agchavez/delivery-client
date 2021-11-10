import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfileCompanyComponent } from './porfile-company.component';

describe('PorfileCompanyComponent', () => {
  let component: PorfileCompanyComponent;
  let fixture: ComponentFixture<PorfileCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfileCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
