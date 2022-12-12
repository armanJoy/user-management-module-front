import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-request-submit-popup',
    templateUrl: './request-submit-popup.component.html',
    styleUrls: ['./request-submit-popup.component.css']
})
export class RequestSubmitPopupComponent implements OnInit {

    constructor(private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.REQUEST_SUBMIT_POPUP;

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.REQUEST_SUBMIT_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "submissionmessagetitle": "Successful Message",
    //     "okBtn": "OK",
    //     "submissionmessage": "Your Add Waste Request Successfully Submitted",

    // }

}
