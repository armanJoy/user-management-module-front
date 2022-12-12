import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InquiryInfoUpdate } from 'src/app/models/backend-update/inquiryUpdate';
import { InquiryVisitorService } from 'src/app/services/visitor-services/inquiry/inquiry-visitor.service';
import { MatDialog } from '@angular/material/dialog';
import { InquiryFormValidator } from './inquiry-form-validator';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstant } from 'src/app/config/app-constant';
import { TermAndConditionPopupComponent } from 'src/app/common-directives/term-and-condition-popup/term-and-condition-popup.component';
import { SubmitPopupComponent } from '../submit-popup/submit-popup.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
@Component({
    selector: 'app-inquiry-form',
    templateUrl: './inquiry-form.component.html',
    styleUrls: ['./inquiry-form.component.css']
})
export class InquiryFormComponent implements OnInit {

    constructor(private inquiryFormValidator: InquiryFormValidator, public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private inquiryVisitorService: InquiryVisitorService, private matDialog: MatDialog, private _snackBar: MatSnackBar, private languageService: LanguageService, private utilService: UtilService) { }
    viewComponent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.viewComponent = true;
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INQUIRY_FORM;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }
    inquiry: InquiryInfoUpdate = {
        id: "",
        companyName: "",
        personName: "",
        contactNo: "",
        emailAddress: "",
        inquiryTitle: "",
        inquiryDetail: "",
        response: "",
        isHuman: false,
        isAgreed: false,
        contactNoFormated: ''
    };
    resetInquiry() {
        this.inquiry = {
            id: "",
            companyName: "",
            personName: "",
            contactNo: "",
            contactNoFormated: "",
            emailAddress: "",
            inquiryTitle: "",
            inquiryDetail: "",
            response: "",
            isHuman: false,
            isAgreed: false,
        }
    };
    prepareContactNumberFormate() {
        const inquiryContactNo: String = this.inquiry.contactNo;
        this.inquiry.contactNo = '';
        for (let index = 0; index < inquiryContactNo.length; index++) {

            this.inquiry.contactNo = this.inquiry.contactNo + inquiryContactNo[index];
            if (index == 1 || index == 5)
                this.inquiry.contactNo += '-';

        }
    }


    addInquiry() {
        if (this.inquiry) {
            var id = this.utilService.generateUniqueId();
            this.inquiry.id = id;
            // this.prepareContactNumberFormate();
            this.inquiryVisitorService.addInquiryInfo(this.inquiry).subscribe((data) => {
                if (data) {
                    this.saveNotification(data.id)
                    this.openDiolog();
                    this.resetInquiry();
                }
            });
        }
    }
    saveNotification(inquiryId: string) {

        this.notificationSetInfo.baseTableId = inquiryId;
        this.notificationSetInfo.contextId = AppConstant.INQUIRY_NOTIFICAIONT_ID;
        this.inquiryVisitorService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }
    saveInquiry() {
        var validationReport = this.inquiryFormValidator.inquiryFormValidator(this.inquiry);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {

            this.addInquiry();

        }
    }
    openTermsAndCondition() {
        const dialogRef = this.matDialog.open(TermAndConditionPopupComponent, {
            width: '500px'

        })

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result) {
                    this.inquiry.isAgreed = true
                }
            };
        })
    }
    openDiolog(): void {
        const sampleDialog = this.dialog.open(SubmitPopupComponent, {
            width: '500px',

        });
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_FORM, AppConstant.UI_LABEL_TEXT);

}
