import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSaveSnackbarComponent } from './subscription-save-snackbar.component';

describe('SubscriptionSaveSnackbarComponent', () => {
  let component: SubscriptionSaveSnackbarComponent;
  let fixture: ComponentFixture<SubscriptionSaveSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionSaveSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSaveSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
