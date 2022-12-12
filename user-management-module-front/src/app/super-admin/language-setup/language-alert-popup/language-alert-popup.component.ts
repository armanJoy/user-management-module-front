import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-language-alert-popup',
    templateUrl: './language-alert-popup.component.html',
    styleUrls: ['./language-alert-popup.component.css']
})
export class LanguageAlertPopupComponent implements OnInit {

    constructor(private languageService: LanguageService) { }

    ngOnInit(): void {
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.LANGUAGEMESSAGE, AppConstant.UI_LABEL_TEXT);
}
