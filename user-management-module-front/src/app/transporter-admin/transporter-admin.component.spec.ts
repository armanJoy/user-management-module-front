import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterAdminComponent } from './transporter-admin.component';

describe('TransporterAdminComponent', () => {
  let component: TransporterAdminComponent;
  let fixture: ComponentFixture<TransporterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
