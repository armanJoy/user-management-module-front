import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionViewInfo } from 'src/app/models/view/subscription-view';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';



@Component({
    selector: 'app-subscription-submission-info',
    templateUrl: './subscription-submission-info.component.html',
    styleUrls: ['./subscription-submission-info.component.css']
})
export class SubscriptionSubmissionInfoComponent implements OnInit {
    @Input()
    subscriptinDetail!: SubscriptionViewInfo;
    constructor(private breakpointObserver: BreakpointObserver, public languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_SUBMISSION_INFO;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    // uiLabels = {
    //     "title": "Subscription Information",
    //     "companyName": "Company Name",
    //     "address": "Address",
    //     "conatctNo": "Contact No",
    //     "subcriptionEmail": "Subscription Email",
    //     "companyCategory": "Company Catagory",
    //     "humanVerification": "Human Verification",
    //     "termsCondition": "Agreed Terms And Condition",
    //     "submit": "Submit"
    // }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_SUBMISSION_INFO, AppConstant.UI_LABEL_TEXT);

}
