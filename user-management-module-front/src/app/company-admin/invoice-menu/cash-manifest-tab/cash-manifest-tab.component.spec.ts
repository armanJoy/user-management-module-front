/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CashManifestTabComponent } from './cash-manifest-tab.component';

describe('CashManifestTabComponent', () => {
  let component: CashManifestTabComponent;
  let fixture: ComponentFixture<CashManifestTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashManifestTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashManifestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
