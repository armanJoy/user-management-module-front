import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InquiryReplyComponent } from '../inquiry-reply/inquiry-reply.component';
import { InquiryInfoFetch } from 'src/app/models/backend-fetch/inquiryFetch';
import { MatDialog } from '@angular/material/dialog';
import { InquiryVisitorService } from 'src/app/services/visitor-services/inquiry/inquiry-visitor.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryInfoUpdate } from 'src/app/models/backend-update/inquiryUpdate';
import { InquiryView } from 'src/app/models/view/inquiryView';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ThreadDiscussionPopupComponent } from 'src/app/visitor/inquiry/thread-discussion-popup/thread-discussion-popup.component';
@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
    @Input()
    public selectedInquiry!: InquiryView;

    @Input()
    inquiryViewList!: InquiryView[];

    // flag: this.userFlag

    updatedInquiry: InquiryInfoUpdate = {
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
    }

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private inquiryVisitorService: InquiryVisitorService, private languageService: LanguageService, private utilService: UtilService) { }

    userFlag = AppConstant.USER_TYPE_ADMIN;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.RESPONSE_TAB;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    openReplyDiolog(selectedInquiry: InquiryInfoFetch): void {

        const sampleDialog = this.dialog.open(InquiryReplyComponent, {
            width: '500px',
            // height: '70%',
            data: selectedInquiry,

            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.selectedInquiry = result;
                this.updateViewInquiry();
            }

        });
    }
    updateViewInquiry() {
        this.preparedUpdatedInquiry(this.selectedInquiry);
        this.inquiryViewList.forEach((inquiryData, ind) => {
            if (inquiryData.id == this.selectedInquiry.id) {
                this.inquiryViewList[ind] = this.selectedInquiry;
            }
        });
        this.inquiryVisitorService.saveReply(this.updatedInquiry).subscribe((inquiry) => {
            if (inquiry) {
            }
        });
    }

    preparedUpdatedInquiry(inquiryUpdate: InquiryInfoFetch) {
        this.updatedInquiry.id = inquiryUpdate.id,
            this.updatedInquiry.companyName = inquiryUpdate.companyName,
            this.updatedInquiry.personName = inquiryUpdate.personName,
            this.updatedInquiry.contactNo = inquiryUpdate.contactNo,
            this.updatedInquiry.emailAddress = inquiryUpdate.emailAddress,
            this.updatedInquiry.inquiryTitle = inquiryUpdate.inquiryTitle,
            this.updatedInquiry.inquiryDetail = inquiryUpdate.inquiryDetail,
            this.updatedInquiry.response = inquiryUpdate.response

    };

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.RESPONSE_TAB, AppConstant.UI_LABEL_TEXT);

}
