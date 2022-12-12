import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { ProjectStatusUpdate } from 'src/app/models/backend-fetch/create-schedule';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-confirm-schedule-popup',
    templateUrl: './confirm-schedule-popup.component.html',
    styleUrls: ['./confirm-schedule-popup.component.css']
})
export class ConfirmSchedulePopupComponent implements OnInit {

    constructor(private languageService: LanguageService, private utilService: UtilService, public dialogRef: MatDialogRef<ConfirmSchedulePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: ProjectInfoFetch) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    uiLabels: any = {
        title: "Create Project Trip Schedule Done",
        closeBtn: "Close",
        okBtn: "Ok"
    }
    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CONFIRM_SCHEDULE_POPUP, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CONFIRM_SCHEDULE_POPUP;
    }
    onClickBtn() {

        var projectStatusUpdate: ProjectStatusUpdate = {
            projectInfoId: this.data.projectInfoId,
            status: AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE
        }
        this.dialogRef.close(projectStatusUpdate);
    }


}
