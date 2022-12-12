import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryView } from 'src/app/models/view/inquiryView';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { InquiryThreadDiscussionService } from 'src/app/services/operation-services/inquiry-thread-discussion.service';
import { InquiryReply } from 'src/app/models/backend-fetch/inquiryFetch';
import { InquiryAdminService } from 'src/app/services/operation-services/inquiry/inquiry-admin.service';
@Component({
    selector: 'app-inquiry-info-list',
    templateUrl: './inquiry-info-list.component.html',
    styleUrls: ['./inquiry-info-list.component.css']
})
export class InquiryInfoListComponent implements OnInit {

    @Input()
    isViewMode!: boolean;

    @Input()
    public firstItemSelection!: (filter: string) => void;

    @Input()
    public selectTab!: (index: number, inquiryViewData: InquiryView) => void;

    @Input()
    inquiryViewList!: InquiryView[];

    filter: string = AppConstant.INQUIRY_INITIAL_FILTER;
    answeredFilter: string = AppConstant.ANSWERED_FILTER;
    unansweredFilter: string = AppConstant.UNANSWERED_FILTER;

    selectedInquiry!: InquiryView

    inquiryId!: string;


    replyList!: InquiryReply[];

    constructor(public inquiryThreadDiscussionService: InquiryThreadDiscussionService, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public inquiryAdminService: InquiryAdminService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INQUIRY_INFO_LIST;

        this.showFirstItem(this.filter);
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    showResponse(item: InquiryView) {
        this.selectedInquiry = item
        this.selectTab(1, item)
    }
    showDiscussion(item: InquiryView) {
        this.selectedInquiry = item;
        this.selectTab(2, item)
    }


    get sortData() {
        return this.inquiryViewList.sort((a, b) => (a.backendDate < b.backendDate) ? 1 : -1);

    }

    showFirstItem(filter: string) {
        this.firstItemSelection(filter);

    }

    searchByText() {

        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        var filterStrign: string = (this.filter == AppConstant.INQUIRY_INITIAL_FILTER) ? this.unansweredFilter : this.answeredFilter;


        this.inquiryAdminService.getInquiryInfoList(pageNo, searchText, filterStrign).subscribe((inquiryList) => {
            if (inquiryList) {
                this.inquiryViewList = this.inquiryAdminService.prepareViewList(inquiryList);
            }
        });
    }




    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_INFO_LIST, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "inquiryListTitle": "Inquiry List",
    //     "filterBy": "Status",
    //     "new": "Unanswered",
    //     "answer": "Answer",
    //     "submitionDateTime": "Date & Time",
    //     "inquiryTitle": "Subject",
    //     "inquiryDetail": "Details",
    //     "inquiryReply": "Reply",
    //     "response": "Response",
    //     "discussion": "Discussion",

    // }
}
