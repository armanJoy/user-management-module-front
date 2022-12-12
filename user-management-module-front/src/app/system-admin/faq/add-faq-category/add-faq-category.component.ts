import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FaqTypeView } from 'src/app/models/view/faq-view';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFaqCategoryValidatorService } from './add-faq-category-validator.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-add-faq-category',
    templateUrl: './add-faq-category.component.html',
    styleUrls: ['./add-faq-category.component.css']
})
export class AddFaqCategoryComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<AddFaqCategoryComponent>, @Inject(MAT_DIALOG_DATA) private data: FaqTypeView, private addFaqCategoryValidatorService: AddFaqCategoryValidatorService, private matDialog: MatDialog, private languageService: LanguageService, private utilService: UtilService) { }

    newFaqType: FaqTypeView = {
        faqTypeId: '',
        faqType: '',
        faqTypeDescription: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_FAQ_CATEGORY_FORM;

        if (this.data && this.data.faqTypeId) {
            this.newFaqType = Object.assign({}, this.data);
        }

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_CATEGORY_FORM, AppConstant.UI_LABEL_TEXT);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    saveFaqType() {
        var validationReport = this.addFaqCategoryValidatorService.faqTypeFormValidator(this.newFaqType);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.dialogRef.close(this.newFaqType);
        }
    }

}
