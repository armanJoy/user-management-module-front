import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { DataForwardLink, DataForwardLinkReturn } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DataForwardLinkReturn, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = {
        headerLabel: 'Confirmation',
        forwardLinkSectionLabel: 'This item linked with these informations-',
        totalForwardLink: 'Total - ',
        confirmationQuestion: 'Do you want to remove the item?',
        noLabel: 'No',
        yesLabel: 'Yes',
        weightCertificateForwardLinkLable: 'Weight certificate of company ',
        tripForwardLinkLabel: 'Scheduled trip at ',

    };

    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.DELETE_CONFITMATION_POPUP;

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }

}
