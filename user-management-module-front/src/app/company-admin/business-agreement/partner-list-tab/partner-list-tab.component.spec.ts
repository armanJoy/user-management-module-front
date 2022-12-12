import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListTabComponent } from './partner-list-tab.component';

describe('PartnerListTabComponent', () => {
  let component: PartnerListTabComponent;
  let fixture: ComponentFixture<PartnerListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
