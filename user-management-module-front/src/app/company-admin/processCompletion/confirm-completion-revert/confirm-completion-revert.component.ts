import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-confirm-completion-revert',
    templateUrl: './confirm-completion-revert.component.html',
    styleUrls: ['./confirm-completion-revert.component.css']
})
export class ConfirmCompletionRevertComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public selectedManifestoList: MenifestoInfo[], private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {
        popupHeader: "Confirm Revert",
        selectedManifestoList: "Selected Manifestos",
        date: "Date",
        manifestoNo: "Manifesto No",
        projectTitle: "Project",
        agreementTitle: "Agreement",
        primaryDisposeCompleteDate: "Primary Disposal Complete Date",
        finalDisposeCompleteDate: "Final Disposal Complete Date",
        confirmButton: "Confirm Revert",
        cancelButton: "Cancel"
    }

    manifestoTypeManual: string = AppConstant.MANIFESTO_TYPE_MANUAL;
    manifestoTypeGenerated: string = AppConstant.MANIFESTO_TYPE_GENERATED;

    componentCode: string = AppConstant.COMP.CONFIRM_COMPLETION_REVERT_POPUP;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

}
