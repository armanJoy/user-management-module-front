import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryInfoFetch, UserInquiry } from 'src/app/models/backend-fetch/inquiryFetch';
import { InquiryThreadDiscussionService } from 'src/app/services/operation-services/inquiry-thread-discussion.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ThreadDiscussionPopupComponent } from '../thread-discussion-popup/thread-discussion-popup.component';

@Component({
    selector: 'app-inquiry-discussion-tab',
    templateUrl: './inquiry-discussion-tab.component.html',
    styleUrls: ['./inquiry-discussion-tab.component.css']
})
export class InquiryDiscussionTabComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public inquiryThreadDiscussionService: InquiryThreadDiscussionService, public dialog: MatDialog) { }

    @Input()
    selectedInquiry!: InquiryInfoFetch;

    userFlag = AppConstant.USER_TYPE_VISITOR;

    inquiryList: InquiryInfoFetch[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INQUIRY_DISCUSSION_TAB;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    userLogin: UserInquiry = {
        emailAddress: '',
        userCode: ''
    }

    resetLogin() {
        this.userLogin = {
            emailAddress: '',
            userCode: ''
        }
    }

    loadInquiry() {
        if (this.userLogin) {
            this.inquiryThreadDiscussionService.getInquiryInfoList(this.userLogin).subscribe((inquiry) => {
                if (inquiry) {
                    this.inquiryList = inquiry
                    this.resetLogin();
                }
            });
        }

    }

    openDisscussionThreadDialog(selectedInquiry: InquiryInfoFetch): void {
        const sampleDialog = this.dialog.open(ThreadDiscussionPopupComponent, {
            width: '75%',
            height: '70%',
            data: {
                selectedInquiry: selectedInquiry,
                selectedInquiryId: selectedInquiry.id,
                flag: this.userFlag
            },
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {

            }

        });
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_DISCUSSION_TAB, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "userMail": "Mail",
    //     "code": "Quiry Code",
    //     "loadBtn": "Load",
    //     "subjectList": "Subject List",
    //     "inquirySubject": "Subject Title",
    //     "senderName": "Sender Name",
    //     "contactNo": "Contact No",
    //     "companyName": "Company Name",
    //     "discussionBtn": "Discussion"
    // }

}
