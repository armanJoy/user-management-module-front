import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSubscriptonProcessDefComponent } from './set-subscripton-process-def.component';

describe('SetSubscriptonProcessDefComponent', () => {
  let component: SetSubscriptonProcessDefComponent;
  let fixture: ComponentFixture<SetSubscriptonProcessDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSubscriptonProcessDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSubscriptonProcessDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
