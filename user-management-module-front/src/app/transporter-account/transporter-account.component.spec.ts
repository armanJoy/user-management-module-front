import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterAccountComponent } from './transporter-account.component';

describe('TransporterAccountComponent', () => {
  let component: TransporterAccountComponent;
  let fixture: ComponentFixture<TransporterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
