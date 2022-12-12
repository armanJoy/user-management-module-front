import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDxrAdminComponent } from './create-dxr-admin.component';

describe('CreateDxrAdminComponent', () => {
  let component: CreateDxrAdminComponent;
  let fixture: ComponentFixture<CreateDxrAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDxrAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDxrAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
