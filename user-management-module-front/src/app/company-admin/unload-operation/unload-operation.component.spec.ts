import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadOperationComponent } from './unload-operation.component';

describe('UnloadOperationComponent', () => {
  let component: UnloadOperationComponent;
  let fixture: ComponentFixture<UnloadOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloadOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
