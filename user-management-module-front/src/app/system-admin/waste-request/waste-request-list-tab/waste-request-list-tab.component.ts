import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { WasteRequestService } from 'src/app/services/operation-services/waste-request/waste-request.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-waste-request-list-tab',
    templateUrl: './waste-request-list-tab.component.html',
    styleUrls: ['./waste-request-list-tab.component.css']
})
export class WasteRequestListTabComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, wasteRequest: WasteRequestInfo) => void;

    @Input()
    wasteRequestList: WasteRequestInfo[] = [];
    @Input()
    public selectedWaste!: WasteRequestInfo;
    viewComponent = false;
    firstItemView: WasteRequestInfo[] = [];

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public wasteRequestService: WasteRequestService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    filter: string = AppConstant.REQUEST_INITIAL_FILTER;
    repliedFilter: string = AppConstant.REPLIED_FILTER;
    newFilter: string = AppConstant.NEW_FILTER;

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_REQUEST_LIST;
        this.showFirstItem();
        this.viewComponent = true;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    showResponse(item: WasteRequestInfo) {
        this.selectedWaste = item;
        this.selectTab(1, item);
    }

    createWaste(item: WasteRequestInfo) {
        this.selectedWaste = item;
        this.selectTab(2, item)
    }

    get sortData() {
        return this.wasteRequestList.sort((a, b) => (a.backendDate < b.backendDate) ? 1 : -1);

    }

    showFirstItem() {
        this.firstItemSet();
    }
    public firstItemSet = (): void => {
        this.firstItemView = [];
        if (this.filter == 'Replied') {
            if (this.wasteRequestList) {
                this.wasteRequestList.forEach((data) => {
                    if (data.reply) {
                        // this.selectedWaste = data;
                        this.firstItemView.push(data);
                    }
                });

            } else {
                // this.selectedWaste = {} as WasteRequestInfo;
                this.firstItemView.push(this.selectedWaste);
            }

        } else {
            if (this.wasteRequestList) {
                this.wasteRequestList.forEach((data) => {
                    if (!data.reply) {
                        // this.selectedWaste = data;
                        this.firstItemView.push(data);
                    }
                });

            } else {
                // this.selectedWaste = {} as WasteRequestInfo;
                this.firstItemView.push(this.selectedWaste);
            }
        }

        this.selectTab(0, this.firstItemView[0]);

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

        var filterString: string = (this.filter == AppConstant.REQUEST_INITIAL_FILTER) ? this.newFilter : this.repliedFilter;
        this.wasteRequestService.getWasteRequestInfoList(pageNo, searchText, filterString).subscribe((wasteList) => {
            if (wasteList) {
                this.wasteRequestList = this.wasteRequestService.prepareWasteRequestView(wasteList);
            }
        });
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_REQUEST_LIST, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "wasteRequestListTab": "Request List",
    //     "new": "New",
    //     "replied": "Replied",
    //     "wasteType": "Waste Type",
    //     "wasteItem": "Waste Item",
    //     "dateTime": "Date & Time",
    //     "response": "Response",
    //     "create": "Create",
    //     "userName": "User Name",
    //     "userEmail": "User Email",
    // }
}
