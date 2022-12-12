import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-inquiry-visitor-tabs',
    templateUrl: './inquiry-visitor-tabs.component.html',
    styleUrls: ['./inquiry-visitor-tabs.component.css']
})
export class InquiryVisitorTabsComponent implements OnInit {

    constructor(private utilService: UtilService, private languageService: LanguageService) { }


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INQUIRY_VISITOR_TABS;
    }

    selectedIndex = 0;

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_VISITOR_TABS, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "inquiryFormTab": "Inquiry Form",
    //     "inquiryDiscussionTab": "Quiry Discussion",
    // }
}
