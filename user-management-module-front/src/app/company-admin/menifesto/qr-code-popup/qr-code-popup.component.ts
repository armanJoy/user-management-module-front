import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { HandoverWastePickAndPackage } from 'src/app/models/backend-fetch/menifesto';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-qr-code-popup',
    templateUrl: './qr-code-popup.component.html',
    styleUrls: ['./qr-code-popup.component.css']
})
export class QrCodePopupComponent implements OnInit {

    constructor(private utilService: UtilService, private languageService: LanguageService, @Inject(MAT_DIALOG_DATA) public popupData: HandoverWastePickAndPackage) { }

    createdCode: string = '';

    uiLabels: any = {
        pageHeader: "Handover QR Code",
        closeButton: "Close"
    }

    componentCode: string = AppConstant.COMP.LOAD_HANDOVER_CODE;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.createdCode = JSON.stringify(this.popupData);
    }

}
