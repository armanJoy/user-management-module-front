import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FaqInfoView, FaqTypeView } from 'src/app/models/view/faq-view';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFaqValidator } from './add-faq-validator';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-add-faq-question-answer',
    templateUrl: './add-faq-question-answer.component.html',
    styleUrls: ['./add-faq-question-answer.component.css']
})
export class AddFaqQuestionAnswerComponent implements OnInit {

    constructor(private addFaqValidator: AddFaqValidator, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<AddFaqQuestionAnswerComponent>, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_QUESTION_ANSWER_FORM, AppConstant.UI_LABEL_TEXT);

    selectedFaqType?: FaqTypeView;
    selectedFaqInfo: any;

    newFaq: FaqInfoView = {
        faqInfoId: '',
        faqInfoQuestion: '',
        faqInfoAnswer: '',
        faqTypeId: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_FAQ_QUESTION_ANSWER_FORM;

        if (this.data) {
            if (this.data.selectedFaqType) {
                this.selectedFaqType = Object.assign({}, this.data.selectedFaqType);
            }
            if (this.data.selectedFaqInfo) {
                this.newFaq = Object.assign({}, this.data.selectedFaqInfo);
            }
        }
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    saveFaq() {
        var validationReport = this.addFaqValidator.faqFormValidator(this.newFaq);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.dialogRef.close(this.newFaq);
        }
    }

}
