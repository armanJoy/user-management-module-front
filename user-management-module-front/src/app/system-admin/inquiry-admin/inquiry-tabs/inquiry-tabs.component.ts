import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryReply } from 'src/app/models/backend-fetch/inquiryFetch';
import { InquiryView } from 'src/app/models/view/inquiryView';
import { InquiryThreadDiscussionService } from 'src/app/services/operation-services/inquiry-thread-discussion.service';
import { InquiryAdminService } from 'src/app/services/operation-services/inquiry/inquiry-admin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-inquiry-list',
    templateUrl: './inquiry-tabs.component.html',
    styleUrls: ['./inquiry-tabs.component.css']
})
export class InquiryListComponent implements OnInit {

    inquiryViewList: InquiryView[] = [];

    constructor(private languageService: LanguageService, public inquiryAdminService: InquiryAdminService, private utilService: UtilService, public inquiryThreadDiscussionService: InquiryThreadDiscussionService) { }

    isViewMode = false;

    viewComponent = false;

    userFlag = AppConstant.USER_TYPE_ADMIN;

    selectedInquiry!: InquiryView;

    firstItemView: InquiryView[] = [];

    inquiryId!: string;

    replyList: InquiryReply[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INQUIRY_TABS;

        this.inquiryAdminService.getInquiryInfoList(AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.UNANSWERED_FILTER).subscribe((inquiry) => {
            if (inquiry) {
                this.inquiryViewList = this.inquiryAdminService.prepareViewList(inquiry);

            }
            this.viewComponent = true;
        });

    }


    selectedIndex = 0;

    public selectTab = (index: number, inquiryViewData: InquiryView): void => {
        this.selectedIndex = index;
        this.selectedInquiry = inquiryViewData;
        this.showReplyList();
    }



    filterVal?: string;
    selectedInq?: InquiryView;
    public firstItemSelection = (filter: string): void => {
        this.filterVal = filter;
        this.firstItemSet();
        this.firstItemDiscussionThread();

    }

    firstItemDiscussionThread() {
        if (this.selectedInquiry.id) {
            this.inquiryThreadDiscussionService.getReplyThread(this.selectedInquiry.id).subscribe((reply) => {
                if (reply) {
                    this.replyList = reply;
                }
            })
        }

    }


    showReplyList() {
        if (this.selectedInquiry.id) {
            this.inquiryThreadDiscussionService.getReplyThread(this.selectedInquiry.id).subscribe((reply) => {
                if (reply) {
                    this.replyList = reply;
                }
            })
        }
    }

    public firstItemSet = (): void => {
        this.firstItemView = [];
        if (this.filterVal == 'Answered') {
            this.inquiryViewList.forEach((data) => {
                if (data.response) {
                    this.firstItemView.push(data);
                }
            });
        } else {
            this.inquiryViewList.forEach((data) => {
                if (!data.response) {
                    this.firstItemView.push(data);
                }
            });
        }
        this.selectTab(0, this.firstItemView[0]);
    }

    indexChange(index: any) {
        this.selectedIndex = index

    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_TABS, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "inquiryListTabTitle": "Inquiry List",
    //     "inquiryresonseTabTitle": "Inquiry Response",
    //     "discussionTabTitle": "Discussion Thread"
    // }
}
