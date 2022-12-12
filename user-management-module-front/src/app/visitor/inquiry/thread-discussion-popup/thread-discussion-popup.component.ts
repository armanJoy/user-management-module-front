import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryInfoFetch, InquiryReply } from 'src/app/models/backend-fetch/inquiryFetch';
import { InquiryThreadDiscussionService } from 'src/app/services/operation-services/inquiry-thread-discussion.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-thread-discussion-popup',
    templateUrl: './thread-discussion-popup.component.html',
    styleUrls: ['./thread-discussion-popup.component.css']
})
export class ThreadDiscussionPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public inquiryThreadDiscussionService: InquiryThreadDiscussionService) { }

    @Input()
    replyList!: InquiryReply[];

    @Input()
    selectedInquiry!: InquiryInfoFetch;

    @Input()
    userFlag!: string;

    @Input()
    isViewMode!: boolean;

    @Input()
    selectedInquiryId!: string;

    inquiryId!: string;

    isAdmin!: string;
    isVisitor!: string;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        if (this.data.selectedInquiryId) {
            this.inquiryId = this.data.selectedInquiryId;
        }


        if (this.data && this.data.selectedInquiry) {
            this.isViewMode = true;
            this.selectedInquiry = Object.assign({}, this.data.selectedInquiry);
            this.userFlag = this.data.flag;
            if (this.inquiryId) {
                this.inquiryThreadDiscussionService.getReplyThread(this.inquiryId).subscribe((reply) => {
                    if (reply) {
                        this.replyList = reply;
                    }
                })
            }
        }

        this.isAdmin = AppConstant.USER_TYPE_ADMIN;
        this.isVisitor = AppConstant.USER_TYPE_VISITOR;

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.DISCUSSION_THREAD_POPUP;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    inquiryReply: InquiryReply = {
        inquiryId: '',
        replyId: '',
        reply: '',
        frontendDate: '',
        backendDate: '',
        userType: ''
    }

    // date = '06.04.22';

    resetInquiryReply() {
        this.inquiryReply = {
            inquiryId: '',
            replyId: '',
            reply: '',
            frontendDate: '',
            backendDate: '',
            userType: ''
        }
    }

    addInquiryReply() {
        if (this.selectedInquiry) {
            if (this.inquiryReply) {
                this.inquiryReply.inquiryId = this.selectedInquiry.id;

                this.inquiryReply.userType = this.userFlag;

                this.inquiryReply.replyId = this.utilService.generateUniqueId();

                this.inquiryThreadDiscussionService.addReplyInfo(this.inquiryReply).subscribe((data) => {
                    if (data) {
                        this.updateReplyList(data)
                        this.resetInquiryReply();
                    }
                });
            }
        }
    }

    updateReplyList(reply: InquiryReply) {
        if (reply) {
            this.replyList.push(reply);
        }

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.DISCUSSION_THREAD_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "close": "Close",
    //     "sendBtn": "Send",
    //     "subjectDetail": "Subject Detail",
    //     "correspondenceDetail": "Correspondence Detail"
    // }

}
