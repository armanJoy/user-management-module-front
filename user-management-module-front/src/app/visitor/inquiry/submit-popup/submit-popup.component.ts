import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-submit-popup',
    templateUrl: './submit-popup.component.html',
    styleUrls: ['./submit-popup.component.css']
})
export class SubmitPopupComponent implements OnInit {
    componentCode!: string;
    isSystemAdmin: boolean = false;

    constructor(private languageService: LanguageService, private utilService: UtilService) { }

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBMITION_POPUP;
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBMITION_POPUP, AppConstant.UI_LABEL_TEXT);



}
