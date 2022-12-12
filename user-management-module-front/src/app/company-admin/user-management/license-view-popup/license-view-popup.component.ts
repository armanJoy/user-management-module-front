import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoFetch, FileView } from 'src/app/models/backend-fetch/user-management-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
@Component({
    selector: 'app-license-view-popup',
    templateUrl: './license-view-popup.component.html',
    styleUrls: ['./license-view-popup.component.css']
})
export class LicenseViewPopupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LicenseViewPopupComponent>, @Inject(MAT_DIALOG_DATA) public file: FileView, private languageService: LanguageService) { }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VIEW_LICENSE_POPUP, AppConstant.UI_LABEL_TEXT);
    ngOnInit(): void {
    }

}
