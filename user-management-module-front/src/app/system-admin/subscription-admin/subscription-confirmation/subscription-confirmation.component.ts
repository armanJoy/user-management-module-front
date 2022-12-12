import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionViewInfo } from 'src/app/models/view/subscription-view';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-subscription-confirmation',
    templateUrl: './subscription-confirmation.component.html',
    styleUrls: ['./subscription-confirmation.component.css']
})
export class SubscriptionConfirmationComponent implements OnInit {

    @Input()
    subscriptinDetail!: SubscriptionViewInfo;
    constructor(private breakpointObserver: BreakpointObserver, public languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_CONFIRMATION;

    }

    // uiLabels = {
    //     cnfirmation: "Confirmation",
    //     accept: "Accept",
    //     reject: "Reject"
    // }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_CONFIRMATION, AppConstant.UI_LABEL_TEXT);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


}
