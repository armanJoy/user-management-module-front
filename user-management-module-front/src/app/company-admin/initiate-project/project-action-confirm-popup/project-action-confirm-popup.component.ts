import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { ActionConfirmPopupDate } from 'src/app/models/backend-fetch/business-agreement';
import { ProjectActionConfirmPopupData } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-project-action-confirm-popup',
    templateUrl: './project-action-confirm-popup.component.html',
    styleUrls: ['./project-action-confirm-popup.component.css']
})
export class ProjectActionConfirmPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ProjectActionConfirmPopupData, private languageService: LanguageService) { }

    uiLabels: any = {
        headerLabel: "Action Confirmation",
        currentStatusStatement: "",
        newStatusStatement: "Project status will be changed to ",
        cancelButton: "Cancel",
        confirmButton: "OK",
    }

    ngOnInit(): void {

        this.uiLabels = this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROJECT_ACTION_CONFIRM_POPUP, AppConstant.UI_LABEL_TEXT);

    }

}
