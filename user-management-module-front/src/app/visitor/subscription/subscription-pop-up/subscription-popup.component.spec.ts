import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPopComponent } from './subscription-popup.component';

describe('SubscriptionPopComponent', () => {
    let component: SubscriptionPopComponent;
    let fixture: ComponentFixture<SubscriptionPopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubscriptionPopComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionPopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
