import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListAdminComponent } from './client-list-admin.component';

describe('ClientListAdminComponent', () => {
  let component: ClientListAdminComponent;
  let fixture: ComponentFixture<ClientListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
